import React, { useState } from 'react';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import ResultCard from './ResultCard';
import SkinToneForm from './SkinToneForm';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
    setPreviewSrc(URL.createObjectURL(event.target.files[0]));
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/dress_detect', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("data:" , data)
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="file">
              <Form.Label>Upload Dress Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Predict
            </Button>
          </Form>
          {previewSrc && (
            <Card className="mt-3">
              <Card.Img variant="top" src={previewSrc} />
            </Card>
          )}
          {result && (
            <div>
              <ResultCard result={result} />
              <SkinToneForm dress={result} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UploadForm;
