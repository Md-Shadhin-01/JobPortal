import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HotJobsCard = ({ job }) => {
  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
  } = job;

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden transition hover:shadow-lg duration-300">
      {/* Company Info */}
      <div className="flex items-center gap-4 p-4 border-b">
        <img src={company_logo} alt={`${company} logo`} className="w-14 h-14 object-contain" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{company}</h4>
          <p className="flex items-center text-sm text-gray-500 gap-1">
            <FaMapMarkedAlt className="text-blue-500" />
            {location}
          </p>
        </div>
      </div>

      {/* Job Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
            NEW
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Requirements / Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {requirements.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-purple-100 hover:text-purple-700 transition"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer with salary and Apply button */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            <strong>Salary:</strong>{' '}
            {salaryRange.min} - {salaryRange.max} {salaryRange.currency}
          </p>
          <Link to={`/jobs/${_id}`}>
            <button className="btn btn-primary btn-sm">Apply</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobsCard;
