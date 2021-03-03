import './ScoreList.scss';

function ScoreList({ matchesData }) {

  return (    
    <ul className="list">
      { 
        matchesData.map( (match) => {
          let results =
            match.contestants.map(contestant => {
              return (<p key={contestant.id} className={`opponent ${contestant.isWinner ? 'winner' : ''}`}>
                <span className="opponent-name">{ contestant.name }</span>
                <span className="score">{ contestant.points }</span>		
              </p>  ) 
            });
           
          return (
            <li key={match.id}>
              <time>{ match.beginAt }</time>
               { results }
            </li>
          )
        }) 
      }
      

    </ul>	
  );
}

export default ScoreList;
