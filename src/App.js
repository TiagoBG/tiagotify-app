import './App.css';
import Header from './components/header/Header';
import PlayerTest from './components/player-test/PlayerTest';
import DashboardPage from './pages/DashboardPage';
import PlaylistsPage from './pages/PlaylistsPage';
import ArtistsPage from './pages/ArtistsPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';



function App() {
  const getToken = () => {
    return window.sessionStorage.getItem('dill') ?  window.sessionStorage.getItem('dill') : null
  }

  return (
      <Router>
      <Header/>
        <Routes style={{background: '#ccd5ae'}}>
          <Route exact path='/' element={<DashboardPage token={getToken()}/>}/>
          <Route path='/playlists' element ={<PlaylistsPage token={getToken()}/>}/>
          <Route path='/artists' element = {<ArtistsPage token={getToken()}/>}/>
        </Routes>
      </Router>
  );
}

export default App;
