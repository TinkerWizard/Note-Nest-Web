import React from 'react';
import { HomePage } from './Layouts/Home/HomePage';
import { NoteDetail } from './Layouts/Home/Components/NoteDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignInForm } from './Layouts/Authentication/SignInForm';
import { SignUpForm } from './Layouts/Authentication/SignUpForm';
import { ProfilePage } from './Layouts/Profile/ProfilePage';
import { AccessDenied } from './Utils/AccessDenied';
import { ResetPassword } from './Layouts/Reset Password/ResetPassword';
import { SetNewPassword } from './Layouts/Reset Password/SetNewPassword';

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
        {/* Others */}
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/set-password/:username" element={<SetNewPassword />} />

      </Routes>
    </Router>
    // </div>
  );
}

export default App;
