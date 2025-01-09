import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Pencil from '../../common/model/Pencil';
import PencilBar from './PencilBar';
import DrawZone from '../../common/components/DrawZone';
import DrawTool from '../../common/model/DrawTool';

function Lobby() {
  const [testDrawTool, setTestDrawTool] = useState(new DrawTool());
  return (
    <Container className="mt-5">
      <h1>Test</h1>
      <DrawZone drawTool={testDrawTool}></DrawZone>
    </Container>
  );
}

export default observer(Lobby);
