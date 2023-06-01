import React, { useEffect, useState } from 'react'
import { Navbar, Home, Games, Login, NotFound, Portfolio, Footer, Forum, Store, Archive, GamesSingle, Videos, VideosSingle, Verify, VideoTag } from './components/index'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AccountNavbar, Overview, AccountPortfolio, AccountStore, Uploads, Settings, Manage, Logs } from './components/Account Section/index'
import { useDispatch, useSelector } from 'react-redux'
import { ProjectSingle } from './components/Portfolio Section/index';
import { getProfile } from './actions/settings';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';

const URI_PATH_HOME = import.meta.env.VITE_URI_PATH_HOME

const App = () => {
  const cookies = new Cookies();

  const dispatch = useDispatch()

  const settings = useSelector((state) => state.settings.data)
  const userData = JSON.parse(localStorage.getItem('profile'))
  const [user, setUser] = useState(userData? userData : null)
  
  useEffect(() => {
    if(!cookies.get("uid")) {
      const newDeviceId = uuidv4();
      cookies.set('uid', newDeviceId, { path: '/', maxAge: new Date(Date.now()+34560000) });
    }
  }, [])

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
              <Route path="games" element={<><Games user={user}/> <Footer /></>} />
              <Route path="games/:id" element={<><GamesSingle user={user}/> <Footer /></>} />
              <Route path="forum" element={<><Forum /> <Footer /></>} />
              <Route path="store" element={<><Store /> <Footer /></>} />
              <Route path="videos" element={<><Videos user={user} /> <Footer /></>} />
              <Route path="videos/:id" element={<><VideosSingle user={user} /> <Footer /></>} />
              <Route path="videos/tags/:tag" element={<><VideoTag user={user} /> <Footer /></>} />
              <Route path="videos/artist/:artist_name" element={<><VideoTag user={user} /> <Footer /></>} />
              <Route path="archive" element={<><Archive /> <Footer /></>} />

              <Route path="/:username/portfolio" element={<><Portfolio /> <Footer /></>} />
              <Route path="/:username/project/:project_name" element={<><ProjectSingle/> <Footer /></>} />

              <Route path="project/:project_name" element={<><ProjectSingle /> <Footer /></>} />
        
              <Route path={`*`} element={<> <NotFound/> <Footer /></>} />
          </Route>
          <Route path="account_verify" element={<><Verify /></>} />
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
            <Route path="logs" element={<><Logs user={user}/></>} />
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