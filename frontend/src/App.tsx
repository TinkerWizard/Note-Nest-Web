import React from 'react';
import { HomePage } from './Layouts/Home/HomePage';
import { NoteDetail } from './Layouts/Home/Components/NoteDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignInForm } from './Layouts/Authentication/SignInForm';
import { SignUpForm } from './Layouts/Authentication/SignUpForm';
import { ProfilePage } from './Layouts/Profile/ProfilePage';
import { AccessDenied } from './Utils/AccessDenied';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page routes */}
        <Route path="/" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />

        {/* Authenticated user routes */}
        <Route path="/notes/:username" element={<HomePage />} />
        <Route path="/note/:_id" element={<NoteDetail />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        {/* <Route path='/*' element={<Error404 />} /> */}
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
