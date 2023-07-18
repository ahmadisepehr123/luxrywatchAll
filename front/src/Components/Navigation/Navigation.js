import React from 'react'
import './Navigation.css'
import {Outlet,useNavigate} from 'react-router-dom';
const Navigation = () => {
  const navigate = useNavigate();
      return (
        <>
        <div>
          <input type="checkbox" id="active"/>
          <label htmlFor="active" className="menu-btn"><span></span></label>
          <label htmlFor="active" className="close"></label>
          <div className="wrapper">
            <ul>
              <li><p onClick={() =>{
                navigate('/home')
                }}>Home</p></li>
              <li><p onClick={() =>{
                navigate('/signin')
                }}>Singin</p></li>
              <li><p onClick={() =>{
                navigate('/register')
                }}>Register</p></li>
              <li><p onClick={() =>{
                navigate('/About')
                }}>About</p></li>
              <li><p onClick={() =>{
                navigate('/gallery')
                }}>Gallery</p></li>
            </ul>
          </div>
        </div>
        <Outlet/>
        </>
      );
      }
  
  export default Navigation;
