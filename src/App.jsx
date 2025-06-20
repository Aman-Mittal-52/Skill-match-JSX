import Navbar from '@/components/layout/Navbar'
import AppRoutes from '@/routes/AppRoutes'
import { DotBackground } from '@/components/DotBackground'
import './App.css'
import Footer from '@/components/home/Footer'

function App() {
  return (
    <DotBackground>
      <Navbar />
      <AppRoutes />
      <Footer />
    </DotBackground>
  )
}

export default App
