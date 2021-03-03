import './App.scss';
import Leaderboard from './components/leaderboard/Leaderboard';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="box">
        <Leaderboard leagueID="185553" />
      </div>
      <Footer />  
    </div>
  );
}

export default App;
