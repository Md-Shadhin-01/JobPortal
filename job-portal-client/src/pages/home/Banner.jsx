
import React from 'react';
import { easeOut, motion } from "framer-motion";
import team1 from '../../assets/Projects-team/team_1.jpg';
import team2 from '../../assets/Projects-team/team_2.jpg';

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <motion.h1
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: easeOut }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          >
            Discover the latest{' '}
            <motion.span
              animate={{ color: ['#ecff33', '#33ffe3', '#ff6133'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block"
            >
              jobs
            </motion.span>{' '}
            for you!
          </motion.h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Explore opportunities tailored to your skills and career goals. Join top companies and
            take the next big step in your professional journey.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Animated Images */}
        <div className="w-full lg:w-1/2 flex justify-center relative gap-6">
          <motion.img
            src={team1}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-40 sm:w-48 lg:w-56 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-xl"
          />
          <motion.img
            src={team2}
            animate={{ y: [20, -10, 20] }}
            transition={{ duration: 6, delay: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-40 sm:w-48 lg:w-56 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

