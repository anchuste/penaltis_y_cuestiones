export const Square = ({ children, isSelected, status}) => {

    //console.log('Se renderiza el componente Square, isSelected: ', isSelected);
    let answer = status;
    let className = `square`;

    if (isSelected === true) {
      className = `square is-selected`;
    }
    
    const handleClick = () => {
      //throwQuestion(index);
    }
  
    return (
      <div className={className}>
        {answer === 'correct'? <h6 className="responseSymbol">✅</h6>: null }
        {answer === 'incorrect'? <h6 className="responseSymbol">❌</h6>: null }
        {answer === 'notAnswered'? <h6 className="responseSymbol">❓</h6>: null }
        <h6>{children}</h6>
      </div>
    )
  }