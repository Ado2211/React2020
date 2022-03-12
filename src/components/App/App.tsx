import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function App() {
  return (
    <Container>
     <FontAwesomeIcon icon= { faHouseChimney } /> Home
    </Container>
  );
}

export default App;
