import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { useState } from 'react';
import '../css/sidebar.css'



function Sidebar() {
  const [openIndex, setOpenIndex] = useState(null); // State to keep track of the currently open accordion index
  // const [bgcolouradd, setBgcolouradd] = useState(false);
  
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // If the same accordion is clicked, close it; otherwise, 
  };
  const[subOpenIndex, setSubOpenIndex] = useState(null)
  const setItColour=(sub_index)=>{  
      setSubOpenIndex(sub_index)
    }


  return (<>
    
    <div class="sidenav">

    <div>
      <div>
        <div onClick={() => toggleAccordion(0)} class="accordion" style={{backgroundColor: openIndex===0?'rgb(45, 30, 56)':''}}>
         
        <label class="label">
          <svg width="25" height="25" version="1.1" viewBox="144 144 512 512" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" style={{ marginRight: "10px" }}>

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

            <g id="SVGRepo_iconCarrier"> <defs> <clipPath id="a"> <path d="m148.09 393h503.81v240h-503.81z"/> </clipPath> </defs> <path d="m438.48 419.17c21.828 0 42.758-8.668 58.191-24.102 15.434-15.434 24.105-36.367 24.105-58.191 0-39.996-64.355-142.1-82.297-169.69-17.887 27.434-82.297 129.7-82.297 169.69h0.003906c0 21.824 8.668 42.758 24.102 58.191 15.434 15.434 36.367 24.102 58.191 24.102z"/> <g clip-path="url(#a)"> <path d="m610.59 413.52-83.391 96.559v2.6328c-0.015625 9.7891-3.9102 19.172-10.832 26.094-6.9219 6.9219-16.305 10.816-26.09 10.828h-122.73c-0.27344 0-20.902 0-32.918 8.1758-2.4805 1.5391-5.7305 0.86719-7.3984-1.5312-1.6641-2.3945-1.1641-5.6758 1.1445-7.4648 14.867-10.258 38.406-10.148 39.172-10.148l122.79-0.003907c6.8516 0 13.43-2.7109 18.289-7.5391 4.8633-4.832 7.6172-11.391 7.6602-18.246 0.054688-0.73047 0.054688-1.4648 0-2.1953-0.39062-0.85938-0.59375-1.7969-0.60156-2.7422-1.125-5.9453-4.2891-11.316-8.9453-15.18-4.6562-3.8672-10.516-5.9883-16.566-5.9961h-65.836c-24.613-0.050781-48.934-5.3633-71.324-15.582l-52.012-23.867c-84.98-44.164-143.96 17.777-152.9 27.98v80.266c55.465 0.66016 110.22 23.867 112.58 24.852l101.71 45.426 0.003906 0.003906c18.461 8.2383 39.387 9.043 58.43 2.25l121.58-42.629h-0.003907c21.027-7.4219 37.953-23.355 46.637-43.891l62.871-148.13c-15.945 0.73047-30.887 7.9922-41.312 20.082z"/> </g> </g>

            </svg>
          Control Usages 
        </label>
        </div>
        {openIndex === 0 && (
          <div class="panel">
            <p> 
              <NavLink to="/authority/setlimit">
              <p class="side-nav-sub-list" onClick={()=>setItColour(0)} style={{backgroundColor:subOpenIndex ===0 ?"rgb(45, 30, 56)": ""}}>Set Limit</p>
              </NavLink>
            </p>
            <p><NavLink to="/authority/setprice"><p class="side-nav-sub-list" onClick={()=>setItColour(1)} style={{backgroundColor:subOpenIndex ===1 ?"rgb(45, 30, 56)": ""}}>Set Price </p></NavLink></p>
            {/* <p><NavLink to="/admin/viewusers"><p class="side-nav-sub-list" onClick={()=>setItColour(2)} style={{backgroundColor:subOpenIndex ===2 ?"rgb(45, 30, 56)": ""}}>View User</p></NavLink></p> */}
          </div>
        )}
      </div>

      <div>
        <div onClick={() => toggleAccordion(1)} class="accordion"  style={{backgroundColor: openIndex===1?'rgb(45, 30, 56)':''}}>
        <label class="label">
        <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="White"
                width="25"
                height="25"
                style={{ marginRight: "10px" }}
              >
                <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path>
              </svg>
          Users
          </label>
        </div>
        {openIndex === 1 && (
          <div class="panel">
           {/* <p> <NavLink to="/set-parameter"  ><p class="side-nav-sub-list">View User </p></NavLink></p> */}
           <p><NavLink to="/authority/viewalluser"><p class="side-nav-sub-list" onClick={()=>setItColour(2)} style={{backgroundColor:subOpenIndex ===2 ?"rgb(45, 30, 56)": ""}}>View User</p></NavLink></p>
          </div>
        )}
      </div>


    </div>

     
    </div>
</>
  )
}


// const accordionStyle = {
//   cursor: 'pointer',
//   padding: '10px',
//   fontWeight: 'bold',
//   backgroundColor: 'transparent',
//   // border: '1px solid #ccc',
//   marginTop: '2vh',
//   marginLeft:'1vw'
// };

// const panelStyle = {
//   padding: '10px',
//   // border: '1px solid #ccc',
//   borderTop: 'none',
//   backgroundColor: 'transparent'
// };

export default Sidebar