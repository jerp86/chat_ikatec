import React, { useState } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';

import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import api from '../../services/api';

import { Container } from '../../styles';

export default function Main({ history }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(undefined);
  const [validEmail, setValidEmail] = useState(undefined);

  function handleValid() {
    if (name) {
      setValidName(true);
    } else {
      setValidName(false);
    }

    if (email) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await api.post(`/users/`, { name, email });

    const response = await api.post(`/sessions/`, { name, email });

    const { user, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    history.push('/messages');
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <h1 className="text-success">Ikatec Chat</h1>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup className="text-success">
              <Label for="name">Name:</Label>
              <Input
                type="text"
                className="form-control"
                id="name"
                placeholder="Insert your name"
                value={name}
                onChange={event => setName(event.target.value)}
                onBlur={() => (name ? setValidName(true) : setValidName(false))}
                valid={validName === undefined ? null : !!validName}
                invalid={validName === undefined ? null : !validName}
              />
            </FormGroup>
          </Col>
          <Col md={8}>
            <FormGroup className="text-success">
              <Label for="email">Email:</Label>
              <Input
                type="email"
                className="form-control"
                id="email"
                placeholder="Insert your best e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
                onBlur={() =>
                  email ? setValidEmail(true) : setValidEmail(false)
                }
                valid={validEmail === undefined ? null : !!validEmail}
                invalid={validEmail === undefined ? null : !validEmail}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4} />
          <Col>
            <FormGroup>
              <Button
                color="success"
                onClick={!validName || !validEmail ? handleValid : handleSubmit}
              >
                <FaAngleDoubleRight />
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
