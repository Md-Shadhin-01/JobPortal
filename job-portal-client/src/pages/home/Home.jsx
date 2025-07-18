import React from 'react';
import Banner from './Banner';
import HotJobs from './HotJobs';

const Home = () => {
    return (
        <div>
            <div className='mb-8'><Banner></Banner></div>
            
         <div className='mb-8'>  <HotJobs></HotJobs></div>
        </div>
    );
};

export default Home;