/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import socketio from 'socket.io-client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaAngleDoubleRight } from 'react-icons/fa';

import {
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Spinner,
} from 'reactstrap';
import { Container } from '../../styles';

import api from '../../services/api';

export default function Messages({ history }) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [valid, setValid] = useState(undefined);

  const user = JSON.parse(localStorage.getItem('user'));

  async function loadPage(pageNumber = page) {
    if (total && pageNumber > total) {
      setHasMore(false);
      return;
    }

    const response = await api.get(`/messages?page=${pageNumber}`);

    const msg = await response.data.messages;
    const totalItems = response.data.count;

    setTotal(Math.floor(totalItems / 30));
    setMessages([...messages, ...msg]);
    setPage(pageNumber + 1);
  }

  useEffect(() => {
    try {
      loadPage();
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert({ error: 'Please, make your login again' });
      history.push('/');
    }
  }, []);

  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: {
          user_id: user.id,
        },
      }),
    [user.id]
  );

  function listMessages({ id, name, message }) {
    if (name === user.name) {
      return (
        <div
          key={id}
          className="d-flex flex-row-reverse"
          style={{ marginTop: 2 }}
        >
          <ListGroupItem color="success">
            <small>{name} - </small>
            {message}
          </ListGroupItem>
        </div>
      );
    }

    return (
      <div key={id} className="d-flex flex-row" style={{ marginTop: 2 }}>
        <ListGroupItem color="info">
          <small>{name} - </small>
          {message}
        </ListGroupItem>
      </div>
    );
  }

  useEffect(() => {
    socket.on('message', message => {
      setMessages([message, ...messages]);
    });
  }, [socket, messages]);

  async function handleClick(event) {
    event.preventDefault();

    const response = await api.post('/messages', { message: newMessage });

    setMessages([response.data, ...messages]);

    setNewMessage('');
  }

  return (
    <Container>
      <Row>
        <h1 className="text-success">Ikatec Chat</h1>
      </Row>

      <Form onSubmit={handleClick}>
        <Col>
          <InfiniteScroll
            dataLength={messages.length}
            next={() => loadPage()}
            hasMore={hasMore}
            loader={<Spinner type="grow" color="success" />}
            height={350}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
          >
            <ListGroup className="d-flex flex-column-reverse text-nowrap bd-highlight">
              {messages.map(msg => listMessages(msg))}
            </ListGroup>
          </InfiniteScroll>
        </Col>

        <Row>
          <Col md={10}>
            <FormGroup className="text-success" row>
              <Input
                type="text"
                className="form-control"
                placeholder="Insert your message"
                value={newMessage}
                onChange={event => setNewMessage(event.target.value)}
                onBlur={() => (newMessage ? setValid(true) : setValid(false))}
                valid={valid === undefined ? null : !!valid}
                invalid={valid === undefined ? null : !valid}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Button color="success" disabled={!valid}>
                <FaAngleDoubleRight />
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
