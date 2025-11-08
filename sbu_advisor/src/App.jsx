import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlannerPage from './pages/PlannerPage';
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";




function App() {
  return (
     <Router>
      <div className='app-container'>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/portal" element={<PlannerPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
