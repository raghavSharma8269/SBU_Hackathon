import { useLocation, useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { state } = useLocation()
  const name = state?.name ?? 'Guest'
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <h1>Welcome, {name}!</h1>
      <p>This is your Home page.</p>
      <button onClick={() => navigate('/portal')}>Go to Portal Page</button>
    </div>
  )
}