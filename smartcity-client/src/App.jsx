import './app.css';
import NavBar from './component/common/NavBar';
import Home from './pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AdminDashboard from './component/admin/AdminDashboard';
import CitizenDashboard from './component/citizen/CitizenDashboard';
import ComplaintsList from './component/admin/ComplaintsList';
import ContactsList from './component/admin/ContactsList';
import MyComplaints from './component/citizen/MyComplaints';
import CreateComplaint from './component/citizen/CreateComplaint';
import BillPayment from './component/citizen/BillPayment';
import ContactUs from './component/citizen/ContactUs';
import Profile from './component/citizen/Profile';
import { useAuth } from './context/useAuth';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isInitializing } = useAuth();
  
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return children;
  
  // Redirect based on role
  const dashboardPath = user.role === 'ADMIN' ? '/admin/dashboard' : '/citizen/dashboard';
  return <Navigate to={dashboardPath} replace />;
};

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={
          <PublicRoute>
            <SignUp/>
          </PublicRoute>
        } />
        <Route path='/login' element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        } />
        
        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard/>
          </ProtectedRoute>
        } />
        <Route path='/admin/complaints' element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="container mx-auto px-4 py-8">
                <ComplaintsList />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path='/admin/contacts' element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="container mx-auto px-4 py-8">
                <ContactsList />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path='/admin/profile' element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="container mx-auto px-4 py-8">
                <Profile />
              </div>
            </div>
          </ProtectedRoute>
        } />
        
        {/* Citizen Routes */}
        <Route path='/citizen/dashboard' element={
          <ProtectedRoute allowedRoles={['CITIZEN']}>
            <CitizenDashboard/>
          </ProtectedRoute>
        } />
        <Route path='/citizen/complaints' element={
          <ProtectedRoute allowedRoles={['CITIZEN']}>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
              <div className="container mx-auto px-4 py-8">
                <MyComplaints />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path='/citizen/complaints/create' element={
          <ProtectedRoute allowedRoles={['CITIZEN']}>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
              <div className="container mx-auto px-4 py-8">
                <CreateComplaint />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path='/citizen/bills' element={
          <ProtectedRoute allowedRoles={['CITIZEN']}>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
              <div className="container mx-auto px-4 py-8">
                <BillPayment />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path='/citizen/contact' element={
          <ProtectedRoute allowedRoles={['CITIZEN']}>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
              <div className="container mx-auto px-4 py-8">
                <ContactUs />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path='/citizen/profile' element={
          <ProtectedRoute allowedRoles={['CITIZEN']}>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
              <div className="container mx-auto px-4 py-8">
                <Profile />
              </div>
            </div>
          </ProtectedRoute>
        } />
        
        {/* Legacy redirects */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Navigate to="/citizen/dashboard" replace />
          </ProtectedRoute>
        } />
        
        {/* Redirect any unknown routes to home */}
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
export default App
