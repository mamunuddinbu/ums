import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentInsertModal from '../studentModal/StudentInsertModal'; // Import the modal component

const Students = () => {
    const [students, setStudents] = useState([]);
    const [isInsertModalOpen, setInsertModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        fetch('http://localhost:8081/students')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    const handleDelete = (id) => {
        console.log('delet btn is clicked')
        if (window.confirm("Are you sure you want to delete this student?")) {
            fetch(`http://localhost:8081/student/${id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(() => {
                setStudents(students.filter(student => student.StudentID !== id)); // Remove student from list after deletion
            })
            .catch(error => console.error('Error deleting student:', error));
        }
    };

    const handleInsertClick = () => {
        setInsertModalOpen(true); // Open the insert modal
    };
    const style1 = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    const style2 = "px-6 py-2 text-sm text-gray-900"
    return (
        <div className="min-h-screen container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Student List</h1>

            {/* Button to open the insert modal */}
            <div className="text-center mb-4">
                <button 
                    onClick={handleInsertClick} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    Insert New Student
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className= {style1}>ID</th>
                            <th className= {style1}>First Name</th>
                            <th className= {style1}>Last Name</th>
                            <th className= {style1}>Age</th>
                            <th className= {style1}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.StudentID} className="bg-white border-b hover:bg-gray-50">
                                <td className={style2}>{student.StudentID}</td>
                                <td className={style2}>{student.FirstName}</td>
                                <td className={style2}>{student.LastName}</td>
                                <td className={style2}>{student.Age}</td>
                                <td className="px-6 py-2 space-x-3">
                                    <Link to={`/students/${student.StudentID}`}>
                                        <button className="bg-green-500 text-white px-6 mr-6 py-1 rounded-md hover:bg-green-600">
                                            View
                                        </button>
                                    </Link>
                                    <Link to={`/edit-student/${student.StudentID}`}>
                                        <button className="bg-yellow-500 text-white px-6 mr-6 py-1 rounded-md hover:bg-yellow-600">
                                            Edit
                                        </button>
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(student.StudentID)} 
                                        className="bg-red-500 text-white px-6 mr-6 py-1 rounded-md hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Render the insert modal, passing props */}
            {isInsertModalOpen && <StudentInsertModal closeModal={() => setInsertModalOpen(false)} />}
        </div>
    );
};

export default Students;
