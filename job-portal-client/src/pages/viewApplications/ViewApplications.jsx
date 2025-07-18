import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplications = () => {
  const initialApplications = useLoaderData();
  const [applications, setApplications] = useState(initialApplications);

  const handleStatusUpdate = (e, id) => {
    const status = e.target.value;
    const data = { status };

    fetch(`http://localhost:5000/job-applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          // Show success alert
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Status updated successfully!',
            showConfirmButton: false,
            timer: 1500,
          });

          // Update local applications state for immediate UI update
          setApplications((prevApps) =>
            prevApps.map((app) =>
              app._id === id ? { ...app, status: status } : app
            )
          );
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">
        Applications Received: {applications.length}
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications available for this job yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-base-content/10 bg-base-100 shadow-md">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Current Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>{app.applicant_email}</td>
                  <td>
                    <span className="badge badge-outline badge-info text-xs">
                      {app.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <select
                      onChange={(e) => handleStatusUpdate(e, app._id)}
                      value={app.status || ''}
                      className="select select-bordered select-sm w-full max-w-xs"
                    >
                      <option disabled value="">
                        Change Status
                      </option>
                      <option value="Under Review">Under Review</option>
                      <option value="Set Interview">Set Interview</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
