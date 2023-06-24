import React from 'react';
import { Card } from 'react-bootstrap';

const ResultCard = ({ result }) => {
  if (!result) {
    return null;
  }

  return (
    <Card className="mt-3">
      <Card.Header as="h5">Dress Prediction</Card.Header>
      <Card.Body>
        <Card.Text>Dress Type: {result.dress_type}</Card.Text>
        <Card.Text>Dress Color: {result.dress_color}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ResultCard;
