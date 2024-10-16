

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">About Us</h1>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to the University Management System (UMS). Our platform is designed to help manage student, teacher, and course-related activities efficiently.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          At UMS, we are committed to providing the best tools to improve communication and administration for educational institutions. Whether you re a student, teacher, or administrator, our system is tailored to simplify your day-to-day tasks.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Our Mission</h2>
        <p className="text-gray-700 text-lg mb-4">
          Our mission is to enhance the educational experience by offering a seamless and easy-to-use management system for universities and educational institutions worldwide. We strive to keep our users satisfied by providing a robust platform that integrates seamlessly into their daily operations.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Our Vision</h2>
        <p className="text-gray-700 text-lg mb-4">
          We envision a world where every educational institution can manage their academic activities in a streamlined manner, promoting better communication and more efficient learning environments. Our goal is to continuously improve and expand our services to meet the evolving needs of educators and learners alike.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Contact Us</h2>
        <p className="text-gray-700 text-lg mb-4">
          If you have any questions or would like to learn more about our platform, feel free to reach out at <a href="mailto:support@ums.com" className="text-blue-600 hover:underline">support@ums.com</a>.
        </p>
        
      </div>
    </div>
  );
};

export default About;
