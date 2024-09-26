import React from 'react'

import {
  Route ,
  createBrowserRouter ,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";
import Home from './home/Home';
import Authentic from './authentication/Authentic';
import User from './user/User';

import Layout from './Layout';
import Authority from './authority/Authority';
import ServoControl from './user/ServoControl';
import ViewAnalytics from './user/ViewAnalytics';
import WaterFlow from './user/WaterFlow';
import User_layout from './user/user_layout';
import Authority_Layout from './authority/Authority_Layout';
import AdminViewAllUsers from './authority/AdminViewAllUsers';
import SetLimit from './authority/SetLimit';
import SetPrice from './authority/SetPrice';


function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
       <Route path="" element={<Home/>}/>
       <Route path="authentication" element={<Authentic/>}/>

       <Route path="user" element={<User_layout/>}>
       <Route path="servocontrol" element={<ServoControl/>}/>
       <Route path="analytics" element={<ViewAnalytics/>}/>
       <Route path="waterflow" element={<WaterFlow/>}/>
       </Route>


       <Route path="authority" element={<Authority_Layout/>}>

       <Route path="viewalluser" element={<AdminViewAllUsers/>}/>
       <Route path="setlimit" element={<SetLimit/>}/>
       <Route path="setprice" element={<SetPrice/>}/>
       

       
       </Route>

      </Route>
      
     

    )
  )
  return <RouterProvider router={router}/>;
   

  
}

export default App;
