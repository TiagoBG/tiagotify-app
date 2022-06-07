import React, { useState } from 'react';
import axios from "axios";
import './playlist-style.css';


const playlists = [
    {
        "name": "80sClassics",
        "key": "7qNIMDhPhjGCmt2x9tx92F"
    },
    {
        "name": "90sIndieRock",
        "key": "7CGHHyDwfu3xsluZLsy8x7"
    },
    {
        "name": "spanishClassics",
        "key": "61wcHHlU6nBURmqirmYBzb"
    },
    {
        "name": "prideClassics",
        "key": "37i9dQZF1DX59HcpGmPXYR"
    },
    {
        "name": "vonladikPlaylist",
        "key": "3EqCa0Qy33AsJZYxj5bC8r"
    },
    {
        "name": "latinPlaylist",
        "key": "0IUNEhjke1w5zk9227gCsp"
    },

];

export default function PlaylistTest({ token }) {

    let [displayedPlaylist, setDisplayedPlaylist] = useState([]);

    const getPlaylistSongs = async (playlistChoice) => {
        const chosenPlaylist = playlists.find((item) => item.name === playlistChoice ? item.key : null);

        const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${chosenPlaylist.key}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        console.log(data.tracks.items);
        setDisplayedPlaylist(data.tracks.items);
    }

    const setTrackDuration = (millis) => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <section style={{ margin: 'auto' }}>
            <div className="playlist-header" style={{display: 'flex', flexFlow: 'row', margin: 'auto', alignItems: 'center', justifyContent: 'space-around'}}>
                <h3>Playlists</h3>
                <button value='80sClassics' className='btn btn-warning playlist-button' onClick={() => getPlaylistSongs('80sClassics')}>80s Classics</button>
                <button value='90sIndieRock' className='btn btn-secondary playlist-button' onClick={() => getPlaylistSongs('90sIndieRock')}>90s Indie Rock</button>
                <button value='spanishClassics' className='btn btn-success playlist-button' onClick={() => getPlaylistSongs('spanishClassics')}>Spanish Classics</button>
                <button value='prideClassics' className='btn btn-info playlist-button' onClick={() => getPlaylistSongs('prideClassics')}>Pride Classics</button>
                {/* <button value='vonladikPlaylist' className='btn btn-dark playlist-button' onClick={() => getPlaylistSongs('vonladikPlaylist')}>Vonladik Playlist</button> */}
                <button value='latinPlaylist' className='btn btn-danger playlist-button' onClick={() => getPlaylistSongs('latinPlaylist')}>Latin Playlist</button>
            </div>            
            {displayedPlaylist.length !== 0 ?
                displayedPlaylist.map(item =>
                    <a key={item.track.name} href={item.track.external_urls.spotify} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', flexFlow: 'row', background: '#001d3d', color: 'white', borderRadius: '8px', margin: '5px auto', width: '70%', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem' }}>
                            <div className="track-base-info col-8" style={{display: 'flex', flexFlow: 'row', alignItems: 'center'}}>
                            <img src={item.track.album.images[2].url} alt={item.track.album.name} height= '100px' width='100px'/>
                            <div className="track-info1 col" style={{marginLeft: '5px', alignItems:'center', padding: '1rem'}}>
                                <h4>{item.track.name}</h4>
                                <h5>Album: {item.track.album.name}</h5>
                            </div>
                            </div>
                            <div className="track-info2 col-4">
                                <h5>Artist: {item.track.artists[0].name}</h5>
                                <h5>Duration: {setTrackDuration(item.track.duration_ms)}</h5>
                            </div>
                        </div>
                    </a>) : null}
        </section>
    )
}
