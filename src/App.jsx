import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import Tasks from './pages/Tasks';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import TaskList from './pages/Sample';
import ProjectDashboard from './pages/ProjectDashboard';
import Login from './pages/auth/Login';
import PreRegistration from './pages/auth/PreAuth';
import AuthLayout from './layouts/AuthLayout';
import TaskDetail from './pages/TaskDetail';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><PreRegistration /></AuthLayout>} />
        <Route path="/project-dashboard" element={<MainLayout><ProjectDashboard /></MainLayout>} />
        <Route path="/tasks" element={<MainLayout><Tasks /></MainLayout>} />
        <Route path="/taskdetail" element={<MainLayout><TaskDetail /></MainLayout>} />
        <Route path="/test" element={<MainLayout><TaskList /></MainLayout>} />
        <Route path="/statistics" element={<MainLayout><Statistics /></MainLayout>} />
        <Route path="/account" element={<MainLayout><Settings /></MainLayout>} />
      </Routes>
    </Router>
  )
}

export default App
