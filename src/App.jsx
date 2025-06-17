import Navbar from '@/components/layout/Navbar'
import AppRoutes from '@/routes/AppRoutes'
import { DotBackground } from '@/components/DotBackground'
import './App.css'

function App() {
  return (
    <DotBackground>
      <Navbar />

      <AppRoutes />
    </DotBackground>
  )
}

export default App
