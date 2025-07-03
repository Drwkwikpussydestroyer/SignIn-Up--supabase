import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { session, signUpNewUser } = UserAuth(); 
  const navigate = useNavigate();
  console.log(session);



  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await signUpNewUser(email, password); 
      if (response.success) {
        navigate('/dashboard'); 
      } else {
        setError(response.error.message);
      }
    } catch (err) {
      setError("An error occurred during sign-up.");
    } finally {
      setLoading(false);
    }
  };


  return (

    <div className='flex justify-center items-center min-h-screen'>

      <form className="max-w-md m-auto pt-24" onSubmit={handleSignUp}>

        <h2 className="font-bold pb-2 text-center">Sign up!</h2>



        <div className="flex flex-col py-4">
          

          <input
            type="email"
            placeholder="email"
            className="p-3 mt-6 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />


          <input
            type="password"
            placeholder="password"
            className="p-3 mt-6 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />


          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up!"}
          </button>


        <p className="absolute bottom-[5%] text-center">

          Already have an account? <Link to="/signin">Sign in!</Link>
        
        </p>


        </div>

      </form>

    </div>

  );
};

export default Signup;
