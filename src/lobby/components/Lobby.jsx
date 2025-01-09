import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RootStore from '../../RootStore';
import PlayerList from './PlayerList';

function Lobby() {
  const { userManager } = useContext(RootStore);

  const mockPlayers = [
    {
      id: 1,
      name: 'Player 1',
      email: 'player1@example.com',
      pseudo: 'P1',
      avatar: 'avatar1.png',
    },
    {
      id: 2,
      name: 'Player 2',
      email: 'player2@example.com',
      pseudo: 'P2',
      avatar: 'avatar2.png',
    },
    {
      id: 3,
      name: 'Player 3',
      email: 'player3@example.com',
      pseudo: 'P3',
      avatar: 'avatar3.png',
    },
  ];

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Lobby</h1>
        </Col>
        <Col>
          <PlayerList players={mockPlayers}></PlayerList>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Lobby);
