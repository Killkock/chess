import './Cell.scss';



function Cell({ isOdd, value }) {
  const className = `cell ${isOdd && 'odd'}`;
  const isOccupied = isNaN(value);


  return <div className={className}>
      {isOccupied ? <Piece name={value} /> : ''}
  </div>;
}

const Piece = ({ name }) => {
    return <img src={require(`../../assets/images/${name}.svg`)} alt='not loaded piece' />
}



export default Cell;
