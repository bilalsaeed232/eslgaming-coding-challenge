import './Title.scss';

function Title({ title, date }) {
  return (    
    <section>
      <h1>{ title }</h1>
      <span className="date">{ date }</span>
    </section>
  );
}

export default Title;
