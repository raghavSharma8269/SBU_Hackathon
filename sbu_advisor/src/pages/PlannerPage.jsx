// Import: Navigation
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Import: Components
import ContentHeader from '../components/ContentHeader'
import SideNav from '../components/SideNav'
import MainView from '../components/MainView'
import SemesterBoard from '../components/SemesterBoard'

// Import: CSS
import './PlannerPage.css'

// Import: Predefine semesters data
import planSemesters from '../data/avaliable_semesters.json'

export default function Portal() {
  const { state } = useLocation()
  const userName = state?.name || 'Guest'

  const handleNewSemester = () => {
    {/* Send Form Data */}
  }

  const handleSaveRoadmap = () => {
    // Persist the current plan (placeholder: static JSON for now)
    localStorage.setItem('roadmap', JSON.stringify({ semesters: planSemesters }))
  }

  return (
    <div className="portal-page">
      <ContentHeader
        onNewSemester={handleNewSemester}
        onSaveRoadmap={handleSaveRoadmap}
        track="SWE Track"
        focus="Full-Stack Development"
      />
      <div className="portal-content">
        <SideNav />
        <MainView>
          <SemesterBoard semesters={planSemesters} />
        </MainView>
      </div>
    </div>
  )
}