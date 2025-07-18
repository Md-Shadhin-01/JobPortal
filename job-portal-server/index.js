
const express = require('express');


const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://jobportal-b2879.web.app',
    'https://jobportal-b2879.firebaseapp.com'
    
  ],
  Credential:true
}));
app.use(express.json());

// Ensure 'uploads' folder exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Static folder for uploaded files
app.use('/uploads', express.static(uploadDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.p9isfq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB");

    const jobsCollection = client.db('jobPortal').collection('jobs');
    const jobApplicationCollection = client.db('jobPortal').collection('job_applications');

    // === JOB ROUTES ===
    app.get('/jobs', async (req, res) => {
      try {
        const email = req.query.email;
        const query = email ? { hr_email: email } : {};
        const result = await jobsCollection.find(query).toArray();
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to fetch jobs" });
      }
    });

    app.get('/jobs/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await jobsCollection.findOne(query);
        if (!result) return res.status(404).send({ error: "Job not found" });
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to fetch job" });
      }
    });

    app.post('/jobs', async (req, res) => {
      try {
        const newJob = req.body;
        if (!newJob.title || !newJob.company) {
          return res.status(400).json({ error: "Job title and company are required" });
        }
        const result = await jobsCollection.insertOne(newJob);
        res.status(201).send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to create job" });
      }
    });

    // === JOB APPLICATION ROUTES ===

    // Get applications by applicant email (for "My Applications" page)
    app.get('/job-application', async (req, res) => {
      try {
        const email = req.query.email;
        if (!email) return res.status(400).send({ error: "Email is required" });

        const query = { applicant_email: email };
        const result = await jobApplicationCollection.find(query).toArray();

        for (const application of result) {
          try {
            const job = await jobsCollection.findOne({ _id: new ObjectId(application.job_id) });
            if (job) {
              application.title = job.title;
              application.location = job.location;
              application.company = job.company;
              application.company_logo = job.company_logo;
            }
          } catch (err) {
            console.error('Error fetching job for application:', err);
          }
        }

        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to fetch job applications" });
      }
    });

    // Get all applicants for a specific job (for HR)
    app.get('/job-applications/jobs/:job_id', async (req, res) => {
      try {
        const jobId = req.params.job_id;
        const query = { job_id: jobId };
        const result = await jobApplicationCollection.find(query).toArray();
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to fetch job applications" });
      }
    });

    // Submit new job application with file uploads
    app.post('/job-applications', upload.fields([
      { name: 'resume', maxCount: 1 },
      { name: 'photo', maxCount: 1 }
    ]), async (req, res) => {
      try {
        const {
          job_id,
          applicant_name,
          applicant_email,
          mobile,
          github,
          linkedin,
          has_experience,
          experience_years,
          status
        } = req.body;

        if (!applicant_name || !applicant_email || !job_id) {
          return res.status(400).json({ error: "Name, email, and job_id are required" });
        }

        const resumeFile = req.files['resume'] ? req.files['resume'][0].filename : null;
        const photoFile = req.files['photo'] ? req.files['photo'][0].filename : null;

        const newApplication = {
          job_id,
          applicant_name,
          applicant_email,
          mobile,
          github,
          linkedin,
          has_experience: has_experience === 'true' || has_experience === true,
          experience_years: experience_years || '0',
          status: status || 'Pending',
          resume: resumeFile,
          photo: photoFile,
          applied_at: new Date()
        };

        const result = await jobApplicationCollection.insertOne(newApplication);

        // Update job's application count
        const job = await jobsCollection.findOne({ _id: new ObjectId(job_id) });
        if (job) {
          let newCount = (job.applicationCount || 0) + 1;
          await jobsCollection.updateOne(
            { _id: new ObjectId(job_id) },
            { $set: { applicationCount: newCount } }
          );
        }

        res.status(201).json({ message: "Application submitted", id: result.insertedId });
      } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ error: "Failed to submit application" });
      }
    });

    // Update application status (e.g., approve/reject by HR)
    app.patch('/job-applications/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const data = req.body;

        if (!data.status) return res.status(400).send({ error: "Status is required" });

        const result = await jobApplicationCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: data.status } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ error: "Application not found" });
        }

        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to update application status" });
      }
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Job backend server is running');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

