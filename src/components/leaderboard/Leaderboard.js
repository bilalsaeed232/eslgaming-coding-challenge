import { useEffect, useState } from 'react';
import './Leaderboard.scss';
import ScoreListSorter from './score-list-sorter/ScoreListSorter';
import ScoreList from './score-list/ScoreList';
import Title from './title/Title';

function Leaderboard({ leagueID }) {
  const [leaderboardState, setLeaderboardState] = useState(
    {
      id: 0,
      name: 'league 1',
      beginAt: "2018-06-29",
      matchesData: [
        {
          id: 111,
          beginAt: "",
          contestants: [
            { id: -1, name: 'dummy', points: 0, isWinner: false},
            { id: 0, name: 'dummy2', points: 2, isWinner: true}
          ]
        }
      ]
      
    }
  );

  const [sortDescState, setSortDescState] = useState(false);



  const toggleSort = () => {
    setSortDescState(!sortDescState);
  }

  useEffect( () => {
    setLeaderboardState({
      ...leaderboardState,
      matchesData: leaderboardState.matchesData.reverse()
    })
  }, [sortDescState])


  useEffect( ()=> {
    async function fetchData() {
      //api calls here

      //get this league data
      const response = await fetch(`http://localhost:3000/leagues/${leagueID}`);
      let leagueData = await response.json();
      let name = leagueData["name"]["full"] || "";
      let beginAt = new Date(leagueData["timeline"]["signUp"]["begin"] || null).toLocaleDateString("de-DE",
        {
          year: "numeric",
          month:"long",
          day:"numeric"
      });


      //get all the contestants info
      let contestantsData = [];
      const contestantsResponse = await fetch(`http://localhost:3000/leagues/${leagueID}/contestants`);
      contestantsData = await contestantsResponse.json();


      //get all the results data of this league
      let matchesData = [];
      const resultsResponse = await fetch(`http://localhost:3000/leagues/${leagueID}/results`);
      let resultsData = await resultsResponse.json();
    

      await resultsData.forEach(match => {
        let beginAt = new Date(match["beginAt"] || null).toLocaleTimeString("de-DE",
        {
          hour:  "2-digit",
          minute: "2-digit",
        });

        let contestants = [];

        match.participants.map( (p) => {
          
          let contestant = contestantsData.find( c => c.id === p.id);
          contestants.push({
            id: contestant["id"],
            name: contestant["name"],
            points: p.points[0],
            isWinner: p.place === 1
          });
          return p;
        });

   
        let matchData = {
          id: match.id,
          beginAt,
          contestants
        }

        matchesData.push(matchData);
      });


      setLeaderboardState({
        id: leagueData.id,
        name,
        beginAt,
        matchesData
      })
      console.dir(leaderboardState);
    }

    fetchData();
  }, [leagueID])


  return (    
    <main>
        <Title title={leaderboardState.name} date={leaderboardState.beginAt} />
        <ScoreListSorter sortDesc={leaderboardState.sortDesc} onSortClick={()=> toggleSort()} />
        <ScoreList matchesData={leaderboardState.matchesData} />
    </main>
  );
}

export default Leaderboard;
