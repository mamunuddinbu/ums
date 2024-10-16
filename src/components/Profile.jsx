// Profile.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../main"; // Import the AuthContext
import { useNavigate } from "react-router-dom";
import { Audio } from 'react-loader-spinner'
const Profile = () => {
  const { loggedIn, loggedInMail } = useContext(AuthContext); // Access loggedIn state from AuthContext
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null); // State to hold fetched profile data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch profile data on component mount
  useEffect(() => {
    if (loggedInMail) {
      fetch(`http://localhost:8081/studentsProfileData/${loggedInMail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setProfileData(data[0]); // Assuming the API returns an array
          } else {
            setError("Profile data not found");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          setError("An error occurred while fetching profile data.");
          setLoading(false);
        });
    }
  }, [loggedInMail]);

  // Redirect to login page if not logged in
  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">You are not logged in.</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Display loading state
  if (loading) {
    return (
      <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>{error}</div>
      </div>
    );
  }

  // Display profile data when loaded
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        {profileData && (
          <div className="space-y-4">
            <div>
              <span className="font-semibold">First Name:</span> {profileData.FirstName}
            </div>
            <div>
              <span className="font-semibold">Last Name:</span> {profileData.LastName}
            </div>
            <div>
              <span className="font-semibold">Date of Birth:</span> {profileData.DateOfBirth}
            </div>
            <div>
              <span className="font-semibold">Gender:</span> {profileData.Gender}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {profileData.Email}
            </div>
            <div>
              <span className="font-semibold">Course:</span> {profileData.Course}
            </div>
            <div>
              <span className="font-semibold">Enrollment Date:</span> {profileData.EnrollmentDate}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
