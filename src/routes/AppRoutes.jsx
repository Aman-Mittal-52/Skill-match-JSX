// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ExploreJobs } from '@/pages/explore-jobs';
import { SearchResults } from '@/pages/SearchResults';
import { JobDetails } from '@/pages/JobDetails';
import { Applications } from '@/pages/Applications';
import AppliedApplication from '@/pages/AppliedApplication';
import PostJob from '@/pages/PostJob';
import PostedJobs from '@/pages/PostedJobs';
import PrivateRoute from '@/components/PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/register' element={<Register />} />
      <Route path='/jobs' element={<ExploreJobs />} />
      <Route path='/jobs/search' element={<SearchResults />} />
      <Route path='/jobs/:jobId' element={<JobDetails />} />
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
    </Routes>
  );
}