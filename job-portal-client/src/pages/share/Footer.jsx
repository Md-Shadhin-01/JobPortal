import React from 'react';
import logo from '../../assets/jobs-logo.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div>
          <img src={logo} alt="Job Portal Logo" className="w-32 mb-4" />
          <p className="text-sm">
            <strong>Job Portal Ltd.</strong>
            <br />
            Providing reliable tech since 1992
          </p>
        </div>

        {/* Services */}
        <div>
          <h6 className="text-lg font-semibold mb-3">Services</h6>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-blue-600 transition" href="#">Branding</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Design</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Marketing</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Advertisement</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="text-lg font-semibold mb-3">Company</h6>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-blue-600 transition" href="#">About us</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Contact</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Jobs</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Press kit</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="text-lg font-semibold mb-3">Legal</h6>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-blue-600 transition" href="#">Terms of use</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Privacy policy</a></li>
            <li><a className="hover:text-blue-600 transition" href="#">Cookie policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar (optional) */}
      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Job Portal Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
