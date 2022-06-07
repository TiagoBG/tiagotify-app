import React from 'react';
import PlaylistTest from '../components/playlist-test/PlaylistTest';
import Background from '../assets/images/close-up-microphone-concert-stage-with-beautiful-lighting.jpg';

const PlaylistsPage = ({token}) => {
    return (
        <section style={{backgroundImage: `url(${Background})`}}>
        {
            token ? <PlaylistTest token={token}/> : <h3>Not information provided</h3>
        }          
        </section>
    );
}

export default PlaylistsPage;
