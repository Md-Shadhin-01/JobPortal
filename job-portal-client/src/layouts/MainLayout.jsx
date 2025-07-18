
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navber from '../pages/share/Navber';
// import Footer from '../pages/share/Footer';

// const MainLayout = () => {
//     return (
//         <div className='max-w-7xl mx-auto'>
//             <Navber></Navber>
//             <Outlet></Outlet>
//             <Footer></Footer>
//         </div>
//     );
// };

// export default MainLayout;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navber from '../pages/share/Navber';
import Footer from '../pages/share/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {/* Navigation */}
            <header className="shadow-md sticky top-0 z-50 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Navber />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Footer />
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
