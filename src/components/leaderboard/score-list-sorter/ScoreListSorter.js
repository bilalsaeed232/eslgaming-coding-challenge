import './ScoreListSorter.scss';

function ScoreListSorter({onSortClick}) {
  return (    
    <div className="list-sorter">
      <button id="sortByDate" className="button button-default" onClick={onSortClick}>Date <span className="caret caret-up"></span></button>
    </div>
  );
}

export default ScoreListSorter;
