// UserPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { name } = useParams(); // Get the name from the URL

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome, {name}!</h1>
        <p className="text-center">This is your personal page.</p>
        {/* Add more user-specific content here */}
      </div>
    </div>
  );
};

export default UserPage;