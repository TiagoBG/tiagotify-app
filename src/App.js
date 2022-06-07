import './App.css';
import Header from './components/header/Header';
import PlayerTest from './components/player-test/PlayerTest';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <DashboardPage/>
      <PlayerTest/>
    </div>
  );
}

export default App;
