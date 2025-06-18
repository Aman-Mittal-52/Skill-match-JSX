// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ExploreJobs } from '@/pages/explore-jobs';
import { SearchResults } from '@/pages/SearchResults';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/auth/login' element={<Login/>}/>
      <Route path='/auth/register' element={<Register/>}/>
      <Route path='/jobs' element={<ExploreJobs/>}/>
      <Route path='/jobs/search' element={<SearchResults/>}/>
    </Routes>
  );
}