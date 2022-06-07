import axios from 'axios';
import React, { useState } from 'react';

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
    };

    const renderArtists = () => {
        return artists.map(artist => (
            artist.images.length ? <article key={artist.id}><img width={"200px"} height={"200px"} src={artist.images[0].url} alt={artist.name} /><h4>{artist.name}</h4></article> : null
        ));
    }

    return (
        <section>
            {
                token ?
                    <div className="artist-section col-7">
                        <form className='col-4' style={{ display: 'flex', flexFlow: 'row', margin: '5% auto' }} onSubmit={searchArtists}>
                            <input className='form-control' type="text" onChange={event => setSearchKey(event.target.value)} placeholder='Type an artist' />
                            <button className='btn btn-primary' style={{ display: 'flex', flexFlow: 'row', marginLeft: '0.5rem' }} type='submit'><i className="bi bi-search" style={{ marginRight: '5px' }}></i> Search</button>
                        </form>
                        <h3>Related results</h3>
                        <section className="search-results" style={{ marginTop: '5%', display: 'grid', gridTemplateColumns: 'repeat(4, 25%)', gridTemplateRows: 'repeat(auto)', justifyItems: 'stretch', gridRowGap: '8px' }}>
                            {renderArtists()}
                        </section>
                    </div> : <h3>Not information provided</h3>
            }
        </section>
    );
}

export default ArtistsPage;
