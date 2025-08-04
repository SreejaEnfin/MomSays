import { Route, Routes } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage'
import ChildLoginPage from './pages/ChildLoginPage'
import ParentLoginPage from './pages/ParentLoginPage'
import ParentDashboard from './pages/ParentDashboardPage'
import ChildDashboard from './pages/ChildDashboard'
import PasswordReset from './pages/PasswordResetPage'
import ForgotPassword from './pages/ForgotPasswordPage'
import ParentRegister from './pages/ParentRegisterPage'
import UploadVoiceFeedbackPage from './pages/UploadVoiceFeedbackPage'
import ChildDetailsPage from './pages/ChildDetailsPage'
import CreateLaunchTestPage from './pages/CreateLaunchTestPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/parent-login" element={<ParentLoginPage />} />
      <Route path="/child-login" element={<ChildLoginPage />} />
      <Route path="/parent-dashboard" element={<ParentDashboard />}>
        <Route path='voice-uploader' element={<UploadVoiceFeedbackPage />} />
        <Route path='child-details' element={<ChildDetailsPage />} />
        <Route path='create-launch-test' element={<CreateLaunchTestPage />} />
      </Route>
      <Route path="/child-dashboard" element={<ChildDashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<PasswordReset />} />
      <Route path='/register' element={<ParentRegister />} />
    </Routes >
  )
}

export default App
