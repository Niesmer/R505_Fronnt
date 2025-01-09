import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

const PlayerList = ({ players }) => {
  return (
    <ListGroup>
      {players.map((player, index) => (
        <ListGroup.Item key={index}>{player}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};
PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PlayerList;
