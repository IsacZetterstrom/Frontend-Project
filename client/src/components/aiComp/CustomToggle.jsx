import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { Button } from 'react-bootstrap';
/**
 * @author Oskar Dahlberg
 * @description To be able to change the colour of the button or have more Accordions .
 */
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});

  return (
    <Button
      className="edit-btn p-2 mt-2 mb-4"
      type="button"
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}
export default CustomToggle;
