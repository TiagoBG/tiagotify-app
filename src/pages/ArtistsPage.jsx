import axios from 'axios';
import React, { useState } from 'react';
import Background from '../assets/images/close-up-microphone-concert-stage-with-beautiful-lighting.jpg';

const ArtistsPage = ({ token }) => {

    const [searchKey, setSearchKey] = useState('');
    const [artists, setArtists] = useState([]);

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
        console.log(data.artists.items);
    };

    const renderArtists = () => {
        return artists.map(artist => (
            artist.images.length ? 
            <a href={artist.external_urls.spotify} target='_blank' rel='noreferrer' style={{textDecoration: 'none', color: 'white'}}>
                <article key={artist.id} style={{background: '#001d3d', margin: '1rem', padding:'1rem', borderRadius: '25px', justifyContent:'center'}}>
                    <img width={"200px"} height={"200px"} src={artist.images[0].url} alt={artist.name} style={{borderRadius: '25px'}} />
                    <h4>{artist.name}</h4>
                </article>
            </a>
            : null
        ));
    }

    return (
        <section className='text-white' style={{backgroundImage: `url(${Background})`}}>
            {
                token ?
                    <div className="artist-section" style={{paddingTop: '2rem'}}>
                    <h3 style={{marginLeft: '44%'}}>Artists searchbar</h3>
                        <form className='col-4' style={{ display: 'flex', flexFlow: 'row', margin: '3% auto' }} onSubmit={searchArtists}>
                            <input className='form-control' type="text" onChange={event => setSearchKey(event.target.value)} placeholder='Type an artist' />
                            <button className='btn btn-primary' style={{ display: 'flex', flexFlow: 'row', marginLeft: '0.5rem' }} type='submit'><i className="bi bi-search" style={{ marginRight: '5px' }}></i> Search</button>
                        </form>
                        <div className="artists-results" style={{marginLeft: '5%'}}>
                            <h3 style={{marginLeft: '42%'}}>Related results</h3>
                            <section className="search-results" style={{ marginTop: '1%', display: 'grid', gridTemplateColumns: 'repeat(4, 25%)', gridTemplateRows: 'repeat(auto)', justifyItems: 'center', gridRowGap: '8px' }}>
                                {renderArtists()}
                            </section>
                        </div>
                    </div> : <h3>Not information provided</h3>
            }
        </section>
    );
}

export default ArtistsPage;
