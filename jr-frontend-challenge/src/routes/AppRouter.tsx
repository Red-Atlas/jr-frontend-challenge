import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from '../pages/Details'
import Home from '../pages/Home'
import Error from '../pages/Error'
import Create from '../pages/Create'
import Edit from '../pages/Edit'

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
