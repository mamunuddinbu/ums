import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Student = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8081/students/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Data:", data); // Log the fetched data
                // If the backend returns an array, pick the first element
                if (Array.isArray(data)) {
                    setStudent(data[0]);
                } else {
                    setStudent(data);
                }
            })
            .catch(error => console.error('Error fetching student data:', error));
    }, [id]);

    console.log("Student ID from URL:", id);
    console.log("Student Object:", student);

    if (!student) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Student Details</h2>
            
            <div className="grid grid-cols-1 gap-4 text-lg">
                <p><strong>ID:</strong> {student.StudentID}</p>
                <p><strong>First Name:</strong> {student.FirstName}</p>
                <p><strong>Last Name:</strong> {student.LastName}</p>
                <p><strong>Age:</strong> {student.Age}</p>
                <p><strong>Gender:</strong> {student.Gender}</p>
                <p><strong>Email:</strong> {student.Email}</p>
                <p><strong>Course:</strong> {student.Course}</p>
                <p><strong>Enrollment Date:</strong> {new Date(student.EnrollmentDate).toLocaleDateString()}</p>
            </div>
            
            <div className="text-center mt-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    Back
                </button>
            </div>
        </div>
    );
};

export default Student;
