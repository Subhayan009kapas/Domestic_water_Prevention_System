import React from 'react'
import {Outlet} from "react-router-dom"
import Sidebar from './Sidebar'
import User from './User'
function User_layout() {
          return (
                    <>
                    <User/>
                    <Sidebar/>
                   <Outlet/>
                   </> 
          )
}

export default User_layout
