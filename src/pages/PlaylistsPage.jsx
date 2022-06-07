import React from 'react';
import PlaylistTest from '../components/playlist-test/PlaylistTest';

const PlaylistsPage = ({token}) => {
    return (
        <section>
        {
            token ? <PlaylistTest token={token}/> : <h3>Not information provided</h3>
        }          
        </section>
    );
}

export default PlaylistsPage;
