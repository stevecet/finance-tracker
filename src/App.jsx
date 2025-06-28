import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      </Routes>
    </Router>
  )
}

export default App
