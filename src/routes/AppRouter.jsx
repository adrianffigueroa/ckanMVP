import App from '@/App'
import DatasetsDetails from '@/components/DatasetsDetails/DatasetDetails'
import Login from '@/components/Login/Login'
import About from '@/pages/About'
import Datasets from '@/pages/Datasets'
import Grupos from '@/pages/Grupos'
import Home from '@/pages/Home'
import Organizaciones from '@/pages/Organizaciones'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="datasets" element={<Datasets />} />
          <Route path="datasetsDetails/:id" element={<DatasetsDetails />} />
          <Route path="organizaciones" element={<Organizaciones />} />
          <Route path="grupos" element={<Grupos />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
