import React, { useEffect, useRef } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import PencilBar from '../../drawtest/components/PencilBar';
import { PropTypes as MobTypes } from 'mobx-react';

DrawZone.propTypes = {
  drawTool: MobTypes.observableObject,
};

function DrawZone({ drawTool }) {
  const canvaRef = useRef();

  useEffect(() => {
    if (canvaRef.current != null) {
      drawTool.canvasDom = canvaRef.current;
    }
  }, [drawTool, canvaRef.current]);
  return (
    <div>
      <Row>
        <Col xs={9}>
          <canvas
            ref={canvaRef}
            width={500}
            height={500}
            className="border border-2 border-black"
          >
          </canvas>
        </Col>
        <Col xs={3}>
          <PencilBar pencil={drawTool.pencil}></PencilBar>
          <Button onClick={() => drawTool.reset()}>Reset</Button>
        </Col>
      </Row>
    </div>
  );
}

export default DrawZone;
