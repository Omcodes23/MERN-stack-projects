import React, { useRef, useState } from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'

function Navbar() {
    function myFunction() {
        const navRef=document.getElementById("myTopnav");
        if (navRef.className === "topnav") {
            navRef.className += " responsive";
        } else {
            navRef.className = "topnav";
        }
      }

  return (
    <div id="navbar_container">
    <div className="topnav" id="myTopnav" > 
        <Link to='/create_quiz' onClick={myFunction}>Create Quiz</Link>
        <Link to='/show_available_quizes' onClick={myFunction}>Show Available Quizes</Link>
        <Link to='/quiz_results_all' onClick={myFunction}>Quizes Results</Link>
        <Link className='icon'><i className="fa fa-bars" onClick={myFunction}></i></Link>
    </div>
    </div>
  )
}

export default Navbar