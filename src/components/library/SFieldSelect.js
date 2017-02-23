import React from 'react';
import { Col, ControlLabel } from 'react-bootstrap';
import SelectField from 'material-ui/SelectField'

function _renderActualComponent(props) {
  const {input, placeholder, meta: {touched, error}, children, custom} = props;
  return (
    <SelectField
      floatingLabelText={placeholder}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      onBlur={(event, index, value) => input.onBlur(value)}
      children={children}
      fullWidth
      {...custom} />
  );
}

const SFieldSelect = (props) => {
  const { meta, label, size, disabled, staticValue } = props;
  const value = staticValue && staticValue.length > 0 ? staticValue[0].getName() : '';
  return (
    <div className={(meta.touched && meta.error ? 'has-error' : '')}>
      <Col componentClass={ControlLabel} className='default-label' sm={2}>
        {disabled ? label : ''}
      </Col>
      <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
        {disabled ? value : _renderActualComponent(props)}
      </Col>
    </div>
  );
}

export default SFieldSelect;