import { observer, PropTypes as MobxTypes } from 'mobx-react';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

PencilBar.propTypes = {
  pencil: MobxTypes.observableObject,
};

function PencilBar({ pencil }) {
  return (
    <Form>
      <Button active={pencil.erasing} onClick={() => pencil.switchErasing()}>
        Gomme
      </Button>
      <Form.Control
        type="color"
        value={pencil.color}
        onChange={(e) => {
          pencil.color = e.target.value;
        }}
      />
      <Form.Control
        type="number"
        value={pencil.width.toString() ?? ''}
        onChange={(e) => {
          pencil.width = Number(e.target.value);
        }}
      />
    </Form>
  );
}

export default observer(PencilBar);
