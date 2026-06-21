import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Sports from './pages/Sports'
import News from './pages/News'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="deportes" element={<Sports />} />
        <Route path="noticias" element={<News />} />
      </Route>
    </Routes>
  )
}

export default App
