import React, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session === null) {
      navigate('/signin');
    }
  }, [session, navigate]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(); // ✅ corrected from "signout()" to "signOut()"
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return ( 
    <div className=''>
      <h1 className="absolute bottom-[5%] right-[10%] font-bold animate-wiggle ">Dashboard</h1>
      <h2>Welcome, {session?.user?.email}</h2>
      <button
        onClick={handleSignOut} 
        className='hover:cursor-pointer border inline-block px-4 py-3 mt-4'>
        Sign Out
      </button>
      
    </div>
  );
};

export default Dashboard;
