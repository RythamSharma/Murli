import React from 'react';
import { Card } from 'react-bootstrap';

function LetterDisplay({ username, message }) {
  return (
    <div className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>From : Gokul</Card.Title>
          <Card.Text>
            {message}
          </Card.Text>
          <Card.Text>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LetterDisplay;
