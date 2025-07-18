// import React from 'react';
// import { Link, useLoaderData } from 'react-router-dom';

// const JobDetails = () => {
//     const {_id,title,company,applicationDeadline}=useLoaderData();
    
//     return (
//         <div>
//             <h2>job details for{title}</h2>
//             <p>apply for:{company}</p>
//             <p>deadline:{applicationDeadline}</p>
//             <Link to={`/jobApply/${_id}`}><button className='btn btn-primary'>apply now</button></Link>
//         </div>
//     );
// };

// export default JobDetails;
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Briefcase, CalendarDays, Building2 } from 'lucide-react'; // if using Lucide icons

const JobDetails = () => {
    const { _id, title, company, applicationDeadline, description, location, salary, requirements } = useLoaderData();

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4 my-8">
            <h2 className="text-2xl font-bold text-blue-700">{title}</h2>

            <div className="text-gray-600 space-y-2">
                <p className="flex items-center gap-2">
                    <Building2 size={18} /> <span className="font-medium">Company:</span> {company}
                </p>
                <p className="flex items-center gap-2">
                    <CalendarDays size={18} /> <span className="font-medium">Deadline:</span> {applicationDeadline}
                </p>
                {location && (
                    <p className="flex items-center gap-2">
                        <Briefcase size={18} /> <span className="font-medium">Location:</span> {location}
                    </p>
                )}
                {salary && (
                    <p><span className="font-medium">Salary:</span> {salary}</p>
                )}
            </div>

            {description && (
                <div>
                    <h4 className="text-lg font-semibold mt-4">Job Description</h4>
                    <p className="text-gray-700">{description}</p>
                </div>
            )}

            {requirements && requirements.length > 0 && (
                <div>
                    <h4 className="text-lg font-semibold mt-4">Requirements</h4>
                    <ul className="list-disc list-inside text-gray-700">
                        {requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>
            )}

            <Link to={`/jobApply/${_id}`}>
                <button className="mt-4 btn btn-primary w-full">Apply Now</button>
            </Link>
        </div>
    );
};

export default JobDetails;
