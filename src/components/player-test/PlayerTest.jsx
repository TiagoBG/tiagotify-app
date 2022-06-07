import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaylistsPage from '../../pages/PlaylistsPage';

export default function PlayerTest() {
    const [token, setToken] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [artists, setArtists] = useState([]);

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

    const searchArtists = async (event) => {
        event.preventDefault();
        const { data } = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                query: searchKey,
                type: 'artist'
            }
        });
        setArtists(data.artists.items);
    };

    const renderArtists = () => {
        return artists.map(artist => (
            artist.images.length ? <article key={artist.id}><img width={"200px"} height={"200px"} src={artist.images[0].url} alt={artist.name} /><h4>{artist.name}</h4></article> : null
        ));
    }

    return (
        <section>
            <div className="action-buttons" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5%', marginRight: '10%' }}>
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

            {/* PLAYLIST TEST */}
            {
                token ?
                    <div style={{ display: 'flex', flexFlow: 'row' }}>
                        <PlaylistsPage token={token}/>
                        <div className="artist-section col-7">
                            <form className='col-4' style={{ display: 'flex', flexFlow: 'row', margin: '5% auto' }} onSubmit={searchArtists}>
                                <input className='form-control' type="text" onChange={event => setSearchKey(event.target.value)} placeholder='Type an artist' />
                                <button className='btn btn-primary' style={{ display: 'flex', flexFlow: 'row', marginLeft: '0.5rem' }} type='submit'><i className="bi bi-search" style={{ marginRight: '5px' }}></i> Search</button>
                            </form>
                            <h3>Related results</h3>
                            <section className="search-results" style={{ marginTop: '5%', display: 'grid', gridTemplateColumns: 'repeat(4, 25%)', gridTemplateRows: 'repeat(auto)', justifyItems: 'stretch', gridRowGap: '8px' }}>
                                {renderArtists()}
                            </section>
                        </div>
                    </div> : null
            }
        </section>
    )
}
