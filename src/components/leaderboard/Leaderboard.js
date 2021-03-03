import { Fragment } from 'react';
import './Leaderboard.scss';
import ScoreListSorter from './score-list-sorter/ScoreListSorter';
import ScoreList from './score-list/ScoreList';
import Title from './title/Title';

function Leaderboard() {
  return (    
    <main>
        <Title />
        <ScoreListSorter />
        <ScoreList />
    </main>
  );
}

export default Leaderboard;
