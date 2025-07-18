// import React, { useContext } from 'react';
// import AuthContext from '../../context/AuthContext';

// const SocialLogin = () => {
//     const {signInWithGoogle}=useContext(AuthContext);
//     const handleGoogleSignIn=()=>{
//         signInWithGoogle()
//         .then(result=>{
//             console.log(result.user)
//         })
//         .catch(error=>{
//             console.log(error.message)
//         })
//     }
//     return (
//         <div>
//              <div className="divider">OR</div>
//             <button onClick={handleGoogleSignIn} className='btn'>Google</button>
//         </div>
//     );
// };

// export default SocialLogin;
import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';

const SocialLogin = ({ onLoginSuccess }) => {
  const { signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleGoogleSignIn = () => {
    setError('');
    signInWithGoogle()
      .then((result) => {
        console.log('Google sign-in success:', result.user);
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }
      })
      .catch((error) => {
        console.error('Google sign-in error:', error.message);
        setError('Failed to sign in with Google. Please try again.');
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-secondary w-full"
        type="button"
      >
        Continue with Google
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default SocialLogin;
