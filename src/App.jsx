import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-body">
      <Navbar className="top-0 left-0 right-0" />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
