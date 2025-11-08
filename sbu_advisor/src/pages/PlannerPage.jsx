// Imports: Navigation, Components, & CSS
import { useLocation, useNavigate } from 'react-router-dom'

import ContentHeader from '../components/ContentHeader'
import SideNav from '../components/SideNav'
import MainView from '../components/MainView'

import './PlannerPage.css'

export default function Portal() {
  const { state } = useLocation()
  const name = state?.name ?? 'Guest'

  return (
    <div className="portal-page">
      <ContentHeader />
      <div className="portal-content">
        <SideNav />
        <MainView />
      </div>
    </div>
  )
}