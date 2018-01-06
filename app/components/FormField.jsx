import React from 'react';
import PropTypes from 'prop-types';

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const canvas = document.querySelector('canvas');
    this.props.makeSignaturePad(canvas);
  }

  render() {
    const { type, formId } = this.props;

    switch (type) {
      case 'TEXT':
      case 'DATE':
      case 'NUMBER':
        return <input className="form-control" type={type} id={formId} name={formId} />;
      case 'SIGNATURE':
        return (<div className="form-control"><canvas>&nbsp;</canvas></div>);
      default:
        return <input className="form-control" type="text" id={formId} name={formId} />;
    }
  }
}

FormField.propTypes = {
  type: PropTypes.string,
  formId: PropTypes.string,
  makeSignaturePad: PropTypes.func,
};

export default FormField;
