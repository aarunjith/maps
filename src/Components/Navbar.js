import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import "./Navbar.scss";
import logo1 from "../images/logo1.png";
import logo2 from "../images/logo2.png";

export default function Navbar() {
   
const navItems = [
  {
    itemName: 'Lat-long',
    path: 'lat-long',
  },
  {
    itemName: 'Maps',
    path: 'maps',
  }
];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <div className='logo-ctn2'>
                <img className='logo2' src={logo2} alt=""></img>
            </div>
            
            <div className="title">
              <div className='title-box'>
                Hydrographic Data Analytics Tool
              </div>
              {/* <span>Hydrographic</span> <span>Data</span> <span>Analytics</span> <span>Tool</span> */}
            </div>
            <div className="actions-list">
                {navItems.map((items, i) => (
                    <NavLink key={i.toString()} aria-current="page"
                     to={`/${items.path}`} className={`nav-link `}>
                      {items.itemName}
                    </NavLink>
                ))}
            </div>
            <div className='logo-ctn1'>
                <img className='logo1' src={logo1} alt=""></img>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}