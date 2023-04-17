import React, { useEffect, useState } from 'react'
import { Navbar, Home, Games, Login, NotFound, Portfolio, Footer, Forum, Store, Archive } from './components/index'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AccountNavbar, Overview, AccountPortfolio, AccountStore, Uploads, Settings, Manage } from './components/Account Section/index'
import { useDispatch, useSelector } from 'react-redux'
import { ProjectSingle } from './components/Portfolio Section/index';
import { getProfile } from './actions/settings';

const URI_PATH_HOME = import.meta.env.VITE_URI_PATH_HOME

const App = () => {
  const dispatch = useDispatch()

  const settings = useSelector((state) => state.settings.data)
  const userData = JSON.parse(localStorage.getItem('profile'))
  const [user, setUser] = useState(userData? userData : null)
  
  useEffect(() => {
      if(user) dispatch(getProfile({id: user.result?._id}))

      if(window.location.pathname.includes('/account') && !user){
        window.location.href = "/"
      }
  }, [user])

  useEffect(() => {
      localStorage.setItem('avatar', settings.avatar ? JSON.stringify(settings.avatar) : '');
  }, [settings])

  return (
    <div className="w-full overflow-hidden bg-gray-900">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<><Navbar path={URI_PATH_HOME} /> <Outlet/></>}>
              <Route index element={<Home path={URI_PATH_HOME}/>} />
              <Route path="games" element={<><Games /> <Footer /></>} />
              <Route path="forum" element={<><Forum /> <Footer /></>} />
              <Route path="store" element={<><Store /> <Footer /></>} />
              <Route path="archive" element={<><Archive /> <Footer /></>} />

              <Route path="/:username/portfolio" element={<><Portfolio /> <Footer /></>} />
              <Route path="/:username/project/:project_name" element={<><ProjectSingle/> <Footer /></>} />

              <Route path="project/:project_name" element={<><ProjectSingle /> <Footer /></>} />

              <Route path={`*`} element={<> <NotFound/> <Footer /></>} />
          </Route>

          {/* <Route path='/:username' element={<><Navbar path={URI_PATH_HOME} /> <Outlet/></>}>
              <Route index element={<Home path={URI_PATH_HOME}/>} />
              <Route path="portfolio" element={<><Portfolio /> <Footer /></>} />
              <Route path="project/:project_name" element={<><ProjectSingle /> <Footer /></>} />
              <Route path={`*`} element={<> <NotFound/> <Footer /></>} />
          </Route>   */}

          <Route path='/account' element={<><AccountNavbar path={URI_PATH_HOME} /> <Outlet/></>}>
            <Route index element={<><Overview /></>} />
            <Route path="portfolio" element={<><AccountPortfolio user={user}/></>} />
            <Route path="uploads" element={<><Uploads user={user}/></>} />
            <Route path="store" element={<><AccountStore user={user}/></>} />
            <Route path="settings" element={<><Settings user={user} settings={settings}/></>} />
            <Route path="settings/:options" element={<><Settings user={user} settings={settings}/></>} />
            <Route path="manage" element={<><Manage user={user}/></>} />
          </Route>  

          <Route path={`${URI_PATH_HOME}/login`} element={<Login path={URI_PATH_HOME} setUser={setUser} />} />
          <Route path={`*`} element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App