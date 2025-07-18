
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobApply = () => {
  const { id } = useParams(); // job_id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    github: '',
    linkedin: '',
    resume: null,
    photo: null,
    hasExperience: false,
    experienceYears: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes (text, checkbox)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle file input changes (resume, photo)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!formData.resume) {
      alert("Resume is required!");
      return;
    }
    if (!formData.photo) {
      alert("Photo is required!");
      return;
    }
    if (formData.hasExperience && !formData.experienceYears) {
      alert("Please enter your years of experience.");
      return;
    }

    setSubmitting(true);

    try {
      const uploadData = new FormData();

      uploadData.append('job_id', id);
      uploadData.append('applicant_name', formData.name);
      uploadData.append('applicant_email', formData.email);
      uploadData.append('mobile', formData.mobile);
      uploadData.append('github', formData.github);
      uploadData.append('linkedin', formData.linkedin);
      uploadData.append('has_experience', formData.hasExperience);
      uploadData.append('experience_years', formData.hasExperience ? formData.experienceYears : '0');
      uploadData.append('status', 'Pending');

      uploadData.append('resume', formData.resume);
      uploadData.append('photo', formData.photo);

      const response = await fetch('https://jobportal-1-2ka1.onrender.com/job-applications', {
        method: 'POST',
        body: uploadData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-green-50 text-center rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-green-700">Application Submitted!</h2>
        <p className="mt-2 text-gray-700">Thank you for applying. We’ll get back to you soon.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 btn btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Apply for This Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="e.g. +1234567890"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">GitHub Profile (optional)</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/yourusername"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-gray-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">LinkedIn Profile (optional)</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-gray-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Resume (PDF) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Photo (PNG) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="photo"
            accept=".png"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg bg-white"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hasExperience"
            name="hasExperience"
            checked={formData.hasExperience}
            onChange={handleChange}
            className="checkbox"
          />
          <label htmlFor="hasExperience" className="font-medium text-gray-700">
            I have previous work experience
          </label>
        </div>

        {formData.hasExperience && (
          <div>
            <label className="block font-medium text-gray-700">Years of Experience</label>
            <input
              type="number"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required={formData.hasExperience}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full btn btn-primary mt-4"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default JobApply;
