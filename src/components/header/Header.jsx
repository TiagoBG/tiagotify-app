import React from 'react';
import Logo from '../../assets/images/tiagotify-removebg.png';


export default function Header() {
  return (
    <header style={{background: '#B71427'}}>
        <img src={Logo} alt='main-banner' style={{height: '100px'}}/>
    </header>
  )
}
