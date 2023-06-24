import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const SkinToneForm = ({ dress }) => {
  const [skinTone, setSkinTone] = useState('');
  const [matchResult, setMatchResult] = useState(null);

  const handleSkinToneChange = event => {
    setSkinTone(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    try {
      // Simulate API call with a mock function
      const mockApiCall = async () => {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Return a random match result
        return Math.random() < 0.5 ? 'Match' : 'No match';
      };

      mockApiCall().then(result => {
        setMatchResult(result);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="skinTone">
        <Form.Label>Skin Tone</Form.Label>
        <Form.Select aria-label="Skin Tone Select" onChange={handleSkinToneChange}>
          <option>Select Skin Tone</option>
          <option value="#EBCCAB">Desert Sand (EBCCAB)</option>
          <option value="#D2996C">Crayola's Tan (D2996C)</option>
          <option value="#C37C4D">Copper Red (C37C4D)</option>
          <option value="#B66B3E">Dark Gold (B66B3E)</option>
          <option value="#8E4B32">Chestnut (8E4B32)</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Match
      </Button>
      {matchResult && (
        <Alert variant={matchResult === 'Match' ? 'success' : 'danger'} className="mt-3">
          {matchResult === 'Match' ? 'The dress matches your skin tone!' : 'The dress does not match your skin tone.'}
        </Alert>
      )}
    </Form>
  );
};

export default SkinToneForm;
