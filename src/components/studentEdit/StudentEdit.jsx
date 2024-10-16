import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StudentEdit = () => {
  const { id } = useParams();  // Get the student ID from the URL
  const navigate = useNavigate();  // For navigating back to the student list
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Age: '',
    Gender: '',
    Email: '',
    Course: '',
    EnrollmentDate: ''
  });

  useEffect(() => {
    // Fetch the current data of the student to pre-fill the form
    fetch(`http://localhost:8081/students/${id}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFormData(data[0]); // If the backend returns an array, use the first element
        } else {
          setFormData(data);
        }
      })
      .catch(error => console.error('Error fetching student data:', error));
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission to update the student information
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8081/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => {
      alert("Student updated successfully.");
      navigate('/students');  // Redirect to the student list after successful update
    })
    .catch(error => console.error('Error updating student:', error));
  };
  console.log(formData);

  const style =  "w-3/4 px-3 py-2 border border-gray-300 ml-auto rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
  const style2 = "block text-gray-700 "

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-1/2 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Student Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          
          <div className='flex items-center'>
            <label className={style2}>First Name:</label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
              className= {style}
            />
          </div>
          <div className='flex items-center'>
            <label className={style2}>Last Name:</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
              className= {style}
            />
          </div>
          <div className='flex items-center'>
            <label className={style2}>Age:</label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              required
              className= {style}
            />
          </div>
          <div className='flex items-center'>
            <label className={style2}>Gender:</label>
            <input
              type="text"
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              required
              className= {style}
            />
          </div>
          <div className='flex items-center'>
            <label className={style2}>Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              className= {style}
            />
          </div>
          <div className='flex items-center'>
            <label className={style2}>Course:</label>
            <input
              type="text"
              name="Course"
              value={formData.Course}
              onChange={handleChange}
              required
              className= {style}
            />
          </div>
          <div className='flex items-center'>
            <label className={style2}>Enrollment Date:</label>
            <input
              type="date"
              name="EnrollmentDate"
              value={formData.EnrollmentDate}
              onChange={handleChange}
              required
              className= {style}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
              onClick={() => navigate('/students')}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentEdit;
