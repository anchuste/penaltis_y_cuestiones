export const Square = ({ children, isSelected, throwQuestion, index }) => {

    //console.log('Se renderiza el componente Square, isSelected: ', isSelected);

    let className = `square`;

    if (isSelected === true) {
      className = `square is-selected`;
    }
    
    const handleClick = () => {
      //throwQuestion(index);
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }