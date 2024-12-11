import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentLoginPage from './pages/StudentLoginPage';
import FacultyLoginPage from './pages/FacultyLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ViewSubmissions from './pages/ViewSubmissions';
import Submissions from './pages/Submissions';
import FeedBackSubmission from './pages/FeedBackSubmission';
import AssignmentCreationPage from './pages/AssignmentCreationPage';
import ViewAssignments from './pages/ViewAssignments';
import ManageFaculty from './pages/ManageFaculty';
import ViewAssignment from './pages/ViewAssignment';
import StudentDashboard from './pages/StudentDashboard';
import StudentAssignmentsPage from './pages/StudentsAssignmentsPage';
import ViewAssignmentPage from './pages/ViewAssignmentPage';
import SubmitAssignmentPage from './pages/SubmitAssignmentPage';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/studentlogin" element={<StudentLoginPage />} />
      <Route path="/facultylogin" element={<FacultyLoginPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/manage-users" element={<ManageUsers />} />
      <Route path="/admin/viewSubmissions/:id" element={<ViewSubmissions />} />
      <Route path="/admin/viewSubmissions/" element={<Submissions />} />
      <Route path="/admin/viewSubmission/:id" element={<FeedBackSubmission />} />
      <Route path="/admin/createAssignment" element={<AssignmentCreationPage />} />
      <Route path="/admin/viewAssignments" element={<ViewAssignments />} />
      <Route path="/admin/manage-faculty" element={<ManageFaculty />} />
      <Route path="/admin/viewAssignments/:id" element={<ViewAssignment />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/student/assignments" element={<StudentAssignmentsPage />} />
      <Route path="/submit-assignment/:id" element={<SubmitAssignmentPage />} />
      {/* <Route path="/quiz/:id" element={<QuizPage />} /> */}
      <Route path="/student/view-assignment/:id" element={<ViewAssignmentPage />} />
      
    </Routes>
  );
};

export default RoutesConfig;
