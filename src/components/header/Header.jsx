import React, { useEffect, useState } from 'react';
import Logo from '../../assets/images/tiagotify-removebg.png';


export default function Header() {
  const [token, setToken] = useState('');
  const LOGIN_HREF = `${window.env.AUTH_ENDPOINT}?client_id=${window.env.CLIENT_ID}&redirect_uri=${window.env.REDIRECT_URI}&response_type=${window.env.RESPONSE_TYPE}`;

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem('dill');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(element => element.startsWith('access_token')).split('=')[1];

      window.location.hash = '';
      window.sessionStorage.setItem('dill', token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken('');
    window.sessionStorage.removeItem('dill');
  };

  return (
    <header style={{ background: '#B71427', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 2rem', paddingRight: '5rem'}}>
      <img src={Logo} alt='tiagotify' style={{ height: '100px'}} />
      <div className="action-buttons" style={{justifySelf: 'flex-end', alignItems: 'center' }}>
        {!token ?
          <a href={LOGIN_HREF}>
            <button className='btn btn-success' style={{ fontWeight: 'bold', fontSize: '20px', padding: '0.5rem', borderRadius: '8px', alignItems: 'center' }}>
              <i className="bi bi-box-arrow-in-right"></i>
              Login
            </button>
          </a> :
          <button className='btn btn-warning' onClick={() => logout()} style={{ fontWeight: 'bold', fontSize: '20px', padding: '0.5rem', borderRadius: '8px', alignItems: 'center' }}>
            <i className='bi bi-box-arrow-right'></i>
            Logout
          </button>
        }
      </div>
    </header>
  )
}
