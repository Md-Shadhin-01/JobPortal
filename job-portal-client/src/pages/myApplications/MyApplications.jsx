

import React, { useEffect, useState } from 'react';
import UseAuth from '../hooks/UseAuth';

const MyApplications = () => {
  const { user } = UseAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://jobportal-1-2ka1.onrender.com/job-application?email=${user.email}`)
        .then(res => res.json())
        .then(data => setApplications(data));
    }
  }, [user?.email]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Job Applications ({applications.length})
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t applied to any jobs yet.</p>
      ) : (
        <>
          {/* Table for medium and larger screens */}
          <div className="hidden md:block overflow-x-auto shadow border rounded-lg">
            <table className="table w-full table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th>Job Title</th>
                  <th>Applicant Name</th>
                  <th>Mobile</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app._id}>
                    <td className="font-semibold">{app.title || 'N/A'}</td>
                    <td>{app.applicant_name}</td>
                    <td>{app.mobile || 'N/A'}</td>
                    <td>
                      {app.has_experience === true || app.has_experience === 'true'
                        ? `${app.experience_years} year(s)`
                        : 'No'}
                    </td>
                    <td>
                      <span className={`badge 
                        ${app.status === 'Hired' ? 'badge-success' : 
                          app.status === 'Rejected' ? 'badge-error' : 
                          app.status === 'Set Interview' ? 'badge-warning' :
                          'badge-ghost'}`}>
                        {app.status || 'Pending'}
                      </span>
                    </td>
                    <td>
                      {app.resume ? (
                        <a
                          href={`https://jobportal-1-2ka1.onrender.com/uploads/${app.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">No resume</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for small screens */}
          <div className="block md:hidden space-y-4">
            {applications.map(app => (
              <div key={app._id} className="border p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg">{app.title || 'N/A'}</h3>
                <p><strong>Name:</strong> {app.applicant_name}</p>
                <p><strong>Mobile:</strong> {app.mobile || 'N/A'}</p>
                <p><strong>Experience:</strong> {app.has_experience === true || app.has_experience === 'true'
                  ? `${app.experience_years} year(s)` : 'No'}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`badge 
                    ${app.status === 'Hired' ? 'badge-success' : 
                      app.status === 'Rejected' ? 'badge-error' : 
                      app.status === 'Set Interview' ? 'badge-warning' :
                      'badge-ghost'}`}>
                    {app.status || 'Pending'}
                  </span>
                </p>
                {app.resume ? (
                  <a
                    href={`https://jobportal-1-2ka1.onrender.com/uploads/${app.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-xs btn-outline mt-2"
                  >
                    View Resume
                  </a>
                ) : (
                  <p className="text-gray-400 italic mt-2">No resume</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyApplications;
