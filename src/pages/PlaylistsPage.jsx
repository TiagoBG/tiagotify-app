import React from 'react';
import PlaylistTest from '../components/playlist-test/PlaylistTest';

const PlaylistsPage = ({token}) => {
    return (
        <section>
        <PlaylistTest token={token} className=''/>            
        </section>
    );
}

export default PlaylistsPage;
