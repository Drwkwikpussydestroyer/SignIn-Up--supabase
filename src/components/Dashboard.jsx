import React, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  // 🚫 Redirect if unauthenticated
  useEffect(() => {
    if (session === null) {
      navigate('/signin');
    }
  }, [session, navigate]);

  // 🔁 Sign out logic
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  // ⏳ Show while waiting for session to resolve
  if (session === undefined) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading your dashboard...
      </div>
    );
  }

  // ✅ Render the dashboard
  return (
    <div className="p-8">
      <h1 className="absolute bottom-[5%] right-[10%] font-bold animate-wiggle">Dashboard</h1>
      <h2 className="text-xl mb-4">Welcome, to project {session?.user?.email}</h2>
      <button
        onClick={handleSignOut}
        className="hover:cursor-pointer border px-4 py-3 mt-4 rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
