import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MemberLayout from './components/member/MemberLayout';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import MembershipPlans from './pages/public/MembershipPlans';
import Trainers from './pages/public/Trainers';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Member Pages
import MemberDashboard from './pages/member/MemberDashboard';
import MemberMembership from './pages/member/MemberMembership';
import WorkoutPlan from './pages/member/WorkoutPlan';
import DietPlan from './pages/member/DietPlan';
import Attendance from './pages/member/Attendance';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import MemberManagement from './pages/admin/MemberManagement';
import TrainerManagement from './pages/admin/TrainerManagement';
import PlansManagement from './pages/admin/PlansManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import AttendanceManagement from './pages/admin/AttendanceManagement';
import ContentManagement from './pages/admin/ContentManagement';

const ADMIN_ROLES = ['super_admin', 'admin', 'manager', 'trainer'];

// Public layout wrapper
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ paddingTop: 'var(--nav-height)' }}>{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{
          style: { background: '#1a1a1a', color: '#fff', border: '1px solid rgba(255,215,0,0.2)' },
          success: { iconTheme: { primary: '#FFD700', secondary: '#000' } },
        }} />
        <Routes>
          {/* Public */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/membership" element={<PublicLayout><MembershipPlans /></PublicLayout>} />
          <Route path="/trainers" element={<PublicLayout><Trainers /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Member Dashboard */}
          <Route path="/member" element={
            <ProtectedRoute allowedRoles={['member']}>
              <MemberLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<MemberDashboard />} />
            <Route path="membership" element={<MemberMembership />} />
            <Route path="workout" element={<WorkoutPlan />} />
            <Route path="diet" element={<DietPlan />} />
            <Route path="attendance" element={<Attendance />} />
          </Route>

          {/* Admin Panel */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="members" element={<MemberManagement />} />
            <Route path="trainers" element={<TrainerManagement />} />
            <Route path="plans" element={<PlansManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="attendance" element={<AttendanceManagement />} />
            <Route path="content" element={<ContentManagement />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
