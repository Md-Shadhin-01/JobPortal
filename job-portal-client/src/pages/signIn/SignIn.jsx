// import Lottie from 'lottie-react';
// import React, { useContext, useState } from 'react';
// import loginLottieJSON from '../../assets/user_login.json';
// import AuthContext from '../../context/AuthContext';
// import SocialLogin from '../share/SocialLogin';
// import { useLocation, useNavigate } from 'react-router-dom';

// const SignIn = () => {
//   const { signInUser } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state || '/';

//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value.trim();
//     const password = form.password.value;

//     setErrorMsg('');

//     signInUser(email, password)
//       .then((result) => {
//         console.log('User signed in:', result.user);
//         navigate(from, { replace: true });
//       })
//       .catch((error) => {
//         setErrorMsg('Invalid email or password. Please try again.');
//         console.log(error.message);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-base-200 py-10">
//       <div className="hero-content flex-col lg:flex-row-reverse gap-12 max-w-7xl mx-auto">
        
//         {/* Animation Section */}
//         <div className="w-full lg:w-1/2">
//           <Lottie animationData={loginLottieJSON} loop={true} />
//         </div>

//         {/* Login Form Section */}
//         <div className="card w-full max-w-sm bg-base-100 shadow-xl">
//           <h1 className="text-4xl font-bold text-center pt-6 text-blue-600">Login</h1>
//           <div className="card-body space-y-3">
//             <form onSubmit={handleSignIn} className="space-y-2">
//               <label className="label">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="input input-bordered w-full"
//                 placeholder="Enter your email"
//                 required
//               />

//               <label className="label">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   className="input input-bordered w-full"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 cursor-pointer text-sm text-blue-500 hover:underline"
//                 >
//                   {showPassword ? 'Hide' : 'Show'}
//                 </span>
//               </div>

//               <div className="text-sm text-right">
//                 <a href="#" className="link link-hover text-blue-500">
//                   Forgot password?
//                 </a>
//               </div>

//               {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

//               <button type="submit" className="btn btn-primary w-full mt-2">
//                 Login
//               </button>
//             </form>

//             <div className="divider">OR</div>

//             <SocialLogin />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import loginLottieJSON from '../../assets/user_login.json';
import AuthContext from '../../context/AuthContext';
import SocialLogin from '../share/SocialLogin'; 
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Called after successful login (manual or social)
  const handleLoginSuccess = (user) => {
    console.log('User logged in:', user);
    navigate('/', { replace: true }); // always go to home
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setErrorMsg('');

    signInUser(email, password)
      .then((result) => {
        handleLoginSuccess(result.user);
      })
      .catch((error) => {
        setErrorMsg('Invalid email or password. Please try again.');
        console.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 max-w-7xl mx-auto">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2">
          <Lottie animationData={loginLottieJSON} loop={true} />
        </div>

        {/* Login Form Section */}
        <div className="card w-full max-w-sm bg-base-100 shadow-xl">
          <h1 className="text-4xl font-bold text-center pt-6 text-blue-600">Login</h1>
          <div className="card-body space-y-3">
            <form onSubmit={handleSignIn} className="space-y-2">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-sm text-blue-500 hover:underline"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>

              <div className="text-sm text-right">
                <a href="#" className="link link-hover text-blue-500">
                  Forgot password?
                </a>
              </div>

              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <button type="submit" className="btn btn-primary w-full mt-2">
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            {/* Pass the success handler to SocialLogin */}
            <SocialLogin onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;


