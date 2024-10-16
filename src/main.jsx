// index.js
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from 'react';
import App from "./App";

import Home from "./components/home/Home";
import SignUp from "./components/signinandLoggin/SignUp";
import Login from "./components/signinandLoggin/Login";
import Teacher from "./components/teacher/Teacher";
import Students from "./components/students/Students";
import Student from "./components/student/Student";
import StudentEdit from "./components/studentEdit/StudentEdit";
import About from "./components/about/About";
import Error from "./components/error/Error";
import Profile from "./components/Profile";


// Create AuthContext
export const AuthContext = createContext();

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/teachers", element: <Teacher /> },
      { path: "/students", element: <Students /> },
      { path: "/students/:id", element: <Student /> },
      { path: "/edit-student/:id", element: <StudentEdit /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

const AuthProvider = ({ children }) => {
  // This will be the state that controls login status
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInMail, setLoggedInMail] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setLoggedIn(true);  // If token exists, set loggedIn to true
    }
  }, []);
  
  
  

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, loggedInMail, setLoggedInMail }}>
      {children}
    </AuthContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the entire app in AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
