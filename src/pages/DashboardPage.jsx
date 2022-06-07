import React, { useEffect, useState } from 'react';
import '../styles/dashboard-styles.css';
import Banner from '../assets/images/banner.jpg';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    /* useEffect(() => {
        let dill = window.sessionStorage.getItem('dill');
    
        if (dill) {
            setToken(token);
        }    
      }, [token]); */

    const navigateToPlaylists = () => {
        navigate('/playlists');
        console.log('PLAYLIST');
    }

    const navigateToArtists = () => {
        navigate('/artists');
        console.log('ARTIST');
    } 

    return (
        <section className="main-banner">
            <div className="card bg-dark text-white">
                <img className="card-img main-banner-img" src={Banner} alt="banner-cover" />
                {token ? 
                    <div className="card-img-overlay main-banner-overlay">
                    <div className="main-banner-section">
                    <button className="btn btn-danger nav-to-playlist">Go to Playlist</button>
                    <button className="btn btn-danger nav-to-artists">Go to Artists</button>
                    </div>
                </div> :
                <div className="card-img-overlay main-banner-overlay">
                    <div className="main-banner-section">
                    <h1>Welcome to Tiagotify</h1>
                    <h4>A Spotify based app to boost your music experience</h4>
                    <button className="btn btn-danger nav-to-playlist" onClick={()=> navigateToPlaylists()}>Go to Playlist</button>
                    <button className="btn btn-danger nav-to-artists" onClick={()=> navigateToArtists()}>Go to Artists</button>
                    </div>
                </div>
                }                
            </div>
        </section>
    );
}

export default DashboardPage;
