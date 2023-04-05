import React, { useEffect, useState } from 'react'
import { Navbar, Home, Games, Login, NotFound, Portfolio, Footer } from './components/index'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AccountNavbar, Overview, AccountPortfolio } from './components/Account Section/index'
import { ProjectSingle } from './components/Portfolio Section/index';

const URI_PATH_HOME = import.meta.env.VITE_URI_PATH_HOME

const App = () => {

  const userData = JSON.parse(localStorage.getItem('profile'))
  const [user, setUser] = useState(userData? userData : null)

  useEffect(() => {
    if(window.location.pathname.includes('/account') && !user){
      window.location.href = "/"
    }
  }, [user])

  return (
    <div className="w-full overflow-hidden bg-gray-900">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<><Navbar path={URI_PATH_HOME} /> <Outlet/></>}>
              <Route index element={<Home path={URI_PATH_HOME}/>} />
              <Route path="games" element={<Games />} />
          </Route>  

          <Route path='/:username' element={<><Navbar path={URI_PATH_HOME} /> <Outlet/></>}>
              <Route index element={<Home path={URI_PATH_HOME}/>} />
              <Route path="portfolio" element={<><Portfolio /> <Footer /></>} />
              <Route path="project/:project_name" element={<><ProjectSingle /> <Footer /></>} />
          </Route>  

          <Route path='/account' element={<><AccountNavbar path={URI_PATH_HOME} /> <Outlet/></>}>
            <Route index element={<><Overview /></>} />
            <Route path="portfolio" element={<><AccountPortfolio user={user}/></>} />
          </Route>  

          <Route path={`${URI_PATH_HOME}/login`} element={<Login path={URI_PATH_HOME} setUser={setUser} />} />
          <Route path={`*`} element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App