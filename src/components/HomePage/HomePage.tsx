import React from 'react';
import { Container } from 'react-bootstrap';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function HomePage() {
  return (
    <Container>
     <FontAwesomeIcon icon= { faHouseChimney } /> Home
    </Container>
  );
}

export default HomePage;
