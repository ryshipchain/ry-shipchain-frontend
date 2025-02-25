import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from './pages/SignInSide'
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import DashboardPage from './pages/DashboardPage';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignInSide />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
    </Routes>
  </BrowserRouter>
  )
}

export default App
