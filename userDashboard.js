// UserDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 21)); // Default to March 21, 2025
  const navigate = useNavigate();

  // Generate calendar days for March 2025
  const daysInMonth = 31; // March has 31 days
  const firstDayOfMonth = new Date(2025, 2, 1).getDay(); // First day of March 2025 (Saturday)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array(firstDayOfMonth).fill(null); // Empty slots before the 1st

  const handleDateClick = (day) => {
    setSelectedDate(new Date(2025, 2, day));
  };

  const handleNewAppointment = () => {
    // Navigate to a new appointment page (you can create this separately)
    navigate('/new-appointment');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Appointment Scheduler</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Section */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-1/3">
          <h2 className="text-lg font-semibold mb-4">March 2025</h2>
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Day Headers */}
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-gray-500 font-medium">
                {day}
              </div>
            ))}
            {/* Empty Days Before 1st */}
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="h-10"></div>
            ))}
            {/* Calendar Days */}
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`h-10 w-full rounded-md ${
                  day === selectedDate.getDate()
                    ? 'bg-gray-800 text-white'
                    : day === 27
                    ? 'bg-gray-200 text-gray-800'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Appointments</h2>
            <button
              onClick={handleNewAppointment}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              New Appointment
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-md">
            <p className="text-gray-600">
              No appointments for{' '}
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className="text-gray-500 mt-2">
              Create a new appointment by clicking the "New Appointment" tab
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;