import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
 
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    
    <button
      className="edit-btn"
      type="button"
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
export default CustomToggle;
