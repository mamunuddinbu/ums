import { useState } from 'react';
import PropTypes from 'prop-types';

const StudentInsertModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Age: '',
    Gender: '',
    Email: '',
    Course: '',
    EnrollmentDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    console.log("insert button is clicked")
    console.log(formData)
    e.preventDefault();
    fetch('http://localhost:8081/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
      
    })
    .then(response => response.json())
    .then(() => {
      alert("New student has been added successfully.");
      closeModal(); // Close the modal after successful insert
    })
    .catch(error => console.error('Error inserting new student:', error));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <div className="flex justify-end">
          <button 
            onClick={closeModal} 
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
            &times;
          </button>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">Insert New Student</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Age:</label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Gender:</label>
            <input
              type="text"
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Course:</label>
            <input
              type="text"
              name="Course"
              value={formData.Course}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Enrollment Date:</label>
            <input
              type="date"
              name="EnrollmentDate"
              value={formData.EnrollmentDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Insert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation
StudentInsertModal.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default StudentInsertModal;
