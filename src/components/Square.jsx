export const Square = ({ children, isSelected, throwQuestion, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      throwQuestion(index);
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }