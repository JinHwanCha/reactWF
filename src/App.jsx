import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import News from './pages/News'
import People from './pages/People'
import AdminLogin from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/Dashboard'

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div className="app">
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/*" element={<Work />} />
        <Route path="/news/*" element={<News />} />
        <Route path="/people/*" element={<People />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App
