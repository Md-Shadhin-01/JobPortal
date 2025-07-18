import React, { useState } from 'react';
import Swal from 'sweetalert2';
import UseAuth from '../hooks/UseAuth';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState('');

  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());

    const { min, max, currency, ...newJob } = initialData;
    newJob.salaryRange = { min, max, currency };
    newJob.requirements = newJob.requirements.split('\n');
    newJob.responsibilities = newJob.responsibilities.split('\n');
    newJob.status = "active";

    fetch('http://localhost:5000/jobs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Job has been added",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/myPostedJobs');
        }
      });
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">🚀 Post a New Job</h2>

        <form onSubmit={handleAddJob} className="space-y-6">

          {/* Row 1: Job Title & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Job Title</label>
              <input type="text" name="title" className="input input-bordered w-full" placeholder="e.g., Software Engineer" required />
            </div>
            <div>
              <label className="label">Location</label>
              <input type="text" name="location" className="input input-bordered w-full" placeholder="e.g., Dhaka, Bangladesh" required />
            </div>
          </div>

          {/* Row 2: Type & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Job Type</label>
              <select name="jobType" className="select select-bordered w-full" required>
                <option value="">Select Job Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Intern</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div>
              <label className="label">Category</label>
              <select name="job_category" className="select select-bordered w-full" required>
                <option value="">Select Category</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>HR</option>
              </select>
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="label">Salary Range</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" name="min" className="input input-bordered w-full" placeholder="Min" required />
              <input type="text" name="max" className="input input-bordered w-full" placeholder="Max" required />
              <select name="currency" className="select select-bordered w-full" required>
                <option value="">Currency</option>
                <option>BDT</option>
                <option>USD</option>
                <option>INR</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="label">Application Deadline</label>
            <input type="date" name="applicationDeadline" className="input input-bordered w-full" required />
          </div>

          {/* Description */}
          <div>
            <label className="label">Job Description</label>
            <textarea name="description" className="textarea textarea-bordered w-full" rows="3" placeholder="Write a short job description..." required></textarea>
          </div>

          {/* Company Name & Logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Company Name</label>
              <input type="text" name="company" className="input input-bordered w-full" placeholder="e.g., Tech Ltd." required />
            </div>
            <div>
              <label className="label">Company Logo URL</label>
              <input
                type="url"
                name="company_logo"
                className="input input-bordered w-full"
                placeholder="Paste image URL"
                required
                onChange={(e) => setLogoUrl(e.target.value)}
              />
              {logoUrl && (
                <div className="mt-2">
                  <img
                    src={logoUrl}
                    alt="Logo Preview"
                    className="w-24 h-24 object-contain border rounded-md shadow"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Requirements & Responsibilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Requirements</label>
              <textarea name="requirements" className="textarea textarea-bordered w-full" rows="4" placeholder="One requirement per line" required></textarea>
            </div>
            <div>
              <label className="label">Responsibilities</label>
              <textarea name="responsibilities" className="textarea textarea-bordered w-full" rows="4" placeholder="One responsibility per line" required></textarea>
            </div>
          </div>

          {/* HR Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">HR Name</label>
              <input type="text" name="hr_name" className="input input-bordered w-full" placeholder="HR contact person" required />
            </div>
            <div>
              <label className="label">HR Email</label>
              <input type="email" name="hr_email" defaultValue={user?.email} className="input input-bordered w-full" placeholder="HR Email" required />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-full md:w-1/2 rounded-full mt-4">
              ✅ Post Job
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddJob;
