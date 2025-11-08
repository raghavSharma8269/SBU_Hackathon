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

// Import: Data
import semesters from '../data/available_classes_updated.json'


export default function Portal() {
  const { state } = useLocation()
  const userName = state?.name || 'Guest'

  const handleNewSemester = () => {
    {/* Send Form Data */}
  }

  const handleSaveRoadmap = () => {
    {/* Save Form Data */}
    localStorage.setItem('roadmap', JSON.stringify({ semesters }))
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
          <SemesterBoard
            semesters={[
              {
                id: 'fall-2025',
                label: 'Semester 1 (Fall 2025)',
                totalCredits: 4,
                courses: [
                  { id: 'CSE 214', name: 'Data Structures', credits: 4, status: 'prereq-issue' }
                ]
              },
              {
                id: 'spring-2026',
                label: 'Semester 2 (Spring 2026)',
                totalCredits: 7,
                courses: [
                  { id: 'CSE 216', name: 'Programming Abstractions', credits: 3, status: 'valid' },
                  { id: 'CSE 220', name: 'Computer Architecture', credits: 4, status: 'valid' }
                ]
              },
              {
                id: 'fall-2026',
                label: 'Semester 3 (Fall 2026)',
                totalCredits: 6,
                courses: [
                  { id: 'CSE 303', name: 'Intro to Database Systems', credits: 3, status: 'valid' },
                  { id: 'CSE 310', name: 'Computer Networks', credits: 3, status: 'valid' }
                ]
              }
            ]}
          />
        </MainView>
      </div>
    </div>
  )
}