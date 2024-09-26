import React from 'react'
import {Outlet} from "react-router-dom"
import Sidebar from './Sidebar'
import Authority from './Authority'
function Authority_Layout() {
          return (
                    <>
                    <Authority/>
                    <Sidebar/>
                    <Outlet/>
                    
                    </>
          )
}

export default Authority_Layout
