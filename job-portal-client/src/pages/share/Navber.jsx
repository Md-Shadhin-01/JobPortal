import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import jobIcon from '../../assets/jobs-logo.png';

const Navber = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log('Sign-out successful'))
      .catch((error) => console.log('Failed to sign out', error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myApplications"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }
        >
          My Applications
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addJob"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }
        >
          Add a Job
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myPostedJobs"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }
        >
          My Posted Jobs
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img className="w-8 h-8" src={jobIcon} alt="Logo" />
            <span className="text-xl font-bold text-blue-700">Job Portal</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
        </div>

        {/* Auth Actions */}
        <div className="navbar-end flex items-center gap-3">
          {user ? (
            <>
              {/* User Avatar or fallback initials */}
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  title={user.displayName}
                  className="w-9 h-9 rounded-full border object-cover"
                />
              ) : (
                <div
                  title={user.displayName || 'User'}
                  className="w-9 h-9 rounded-full border bg-gray-300 flex items-center justify-center text-gray-700 font-semibold"
                >
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
              )}

              {/* Show user name */}
              <span className="hidden md:inline font-medium">{user.displayName || 'User'}</span>

              <button onClick={handleSignOut} className="btn btn-outline btn-sm">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="btn btn-outline btn-sm">Register</button>
              </Link>
              <Link to="/signIn">
                <button className="btn btn-primary btn-sm">Sign in</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navber;

