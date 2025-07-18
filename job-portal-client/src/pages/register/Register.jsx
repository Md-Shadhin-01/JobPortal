
import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import registerAnimationData from '../../assets/Register_lottie.json';
import AuthContext from '../../context/AuthContext';
import SocialLogin from '../share/SocialLogin';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log('User registered:', result.user);
        form.reset();
        navigate('/signin'); // ✅ go to sign in after manual registration
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  // ✅ Called after successful Google login — go to Home
  const handleSocialLoginSuccess = (user) => {
    console.log('Google login from Register page:', user);
    navigate('/'); // ✅ Direct to home if logged in via Google
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 max-w-7xl mx-auto">
        {/* Animation */}
        <div className="w-full lg:w-1/2">
          <Lottie animationData={registerAnimationData} loop={true} />
        </div>

        {/* Form */}
        <div className="card w-full max-w-sm bg-base-100 shadow-xl">
          <h1 className="text-4xl font-bold text-center pt-6 text-blue-600">Register</h1>
          <div className="card-body space-y-3">
            <form onSubmit={handleRegister} className="space-y-2">
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
                Register
              </button>
            </form>

            <div className="divider">OR</div>

            {/* ✅ Pass login success callback to SocialLogin */}
            <SocialLogin onLoginSuccess={handleSocialLoginSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
