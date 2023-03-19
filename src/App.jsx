import React from 'react'
import { Navbar, Home, Games, Login, NotFound } from './components/index'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import styles from "./style";

const URI_PATH_HOME = import.meta.env.VITE_URI_PATH_HOME

const App = () => {
  const auth = useSelector((state) => state.auth)

  return (
    <div className="w-full overflow-hidden bg-gray-900">
      <BrowserRouter>
        <Routes>

          <Route path={`${URI_PATH_HOME}`} element={<><Navbar path={URI_PATH_HOME} /> <Outlet/></>}>
              <Route index element={<Home path={URI_PATH_HOME}/>} />
              <Route path="games" element={<Games />} />
          </Route>  

          <Route path={`${URI_PATH_HOME}/login`} element={<Login path={URI_PATH_HOME}/>} />
          <Route path={`*`} element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App