import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RootStore from '../../RootStore';

function Acceuil() {
  const { userManager } = useContext(RootStore);
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Row className="justify-content-md-center">
        <Col md="auto" className="text-center">
          <h1>Acceuil</h1>
          <Link to="/lobby"><Button variant="primary" className="my-3">Créer une partie</Button></Link>
          <p>
            {'Tu es : '}
            {userManager.user?.pseudo ?? (
              <Link to="/login">
                <Button variant="primary">Se connecter</Button>
              </Link>
            )}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Acceuil);
