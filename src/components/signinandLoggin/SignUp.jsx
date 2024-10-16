import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Gender: "",
    Email: "",
    Course: "",
    EnrollmentDate: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [courses, setCourses] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const navigate = useNavigate();

  // Fetch courses on component mount
  useEffect(() => {
    fetch("http://localhost:8081/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Debounce Email Uniqueness Check
  useEffect(() => {
    const debounceEmailCheck = setTimeout(() => {
      if (formData.Email) {
        checkEmailUniqueness();
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceEmailCheck);
  }, [formData.Email]);

  const checkEmailUniqueness = async () => {
    try {
      const response = await fetch(`http://localhost:8081/check-email?email=${formData.Email}`);
      const data = await response.json();
      setIsEmailUnique(data.isUnique);
      setEmailError(data.isUnique ? "" : "Email is already taken");
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isEmailUnique) {
      alert("Please use a unique email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/studentsProfileData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register student");
      }

      alert("New student has been added successfully.");
      setFormData({
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        Gender: "",
        Email: "",
        Course: "",
        EnrollmentDate: "",
        Password: "",
        ConfirmPassword: "",
      });
      setEmailError("");
      navigate("/login");
    } catch (error) {
      console.error("Error inserting new student:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">First Name:</label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Last Name:</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
            <input
              type="date"
              name="DateOfBirth"
              value={formData.DateOfBirth}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
          </div>

          {/* Course */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Course:</label>
            <select
              name="Course"
              value={formData.Course}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select a Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Enrollment Date */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Enrollment Date:</label>
            <input
              type="date"
              name="EnrollmentDate"
              value={formData.EnrollmentDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-1 text-sm font-medium text-indigo-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formData.Password !== formData.ConfirmPassword && (
              <p className="text-red-500 text-xs">Passwords do not match</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              name="ConfirmPassword"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
