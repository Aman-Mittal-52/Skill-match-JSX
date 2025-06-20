// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Routes
import Home from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ExploreJobs } from '@/pages/explore-jobs';
import { SearchResults } from '@/pages/SearchResults';
import { JobDetails } from '@/pages/JobDetails';
import Profile from '@/pages/Profile';

// Private Route
import PrivateRoute from '@/components/PrivateRoute';

// Private Routes

// - Seeker Routes
import { Applications } from '@/pages/Applications';

// - Recruiter Routes
import AppliedApplication from '@/pages/AppliedApplication';
import PostJob from '@/pages/PostJob';
import PostedJobs from '@/pages/PostedJobs';

// - Admin Routes
import AdminUsers from '@/pages/AdminUsers';
import AdminJobs from '@/pages/AdminJobs';

export default function AppRoutes() {
  return (
    <Routes>
      
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/register' element={<Register />} />
      <Route path='/jobs' element={<ExploreJobs />} />
      <Route path='/jobs/search' element={<SearchResults />} />
      <Route path='/jobs/:jobId' element={<JobDetails />} />
      <Route path="/profile" element={<Profile />} />

      {/* Private Routes */}
      <Route
        path='/applications'
        element={
          <PrivateRoute requiredRole="seeker">
            <Applications />
          </PrivateRoute>
        } />
      <Route
        path='/jobs/:jobId/applications'
        element={
          <PrivateRoute requiredRole="recruiter">
            <AppliedApplication />
          </PrivateRoute>
        }
      />
      <Route
        path='/jobs/post'
        element={
          <PrivateRoute requiredRole="recruiter">
            <PostJob />
          </PrivateRoute>
        }
      />
      <Route
        path='/jobs/posted'
        element={
          <PrivateRoute requiredRole="recruiter">
            <PostedJobs />
          </PrivateRoute>
        }
      />
      <Route path="/admin/users" element={
        <PrivateRoute requiredRole="admin">
          <AdminUsers />
        </PrivateRoute>
      } />
      <Route path="/admin/jobs" element={
        <PrivateRoute requiredRole="admin">
          <AdminJobs />
        </PrivateRoute>
      } />
    </Routes>
  );
}