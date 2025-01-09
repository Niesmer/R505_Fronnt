import React from 'react';

import { Container } from 'react-bootstrap';

import { Outlet } from 'react-router-dom';

function Root() {
  return (

    <>

      <main>

        <Container fluid>

          <Outlet />

        </Container>

      </main>

    </>

  );
}

export default Root;
