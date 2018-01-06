import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

const Form = ({
  data, onSubmit, makeSignaturePad, addNewSection, formatName
}) => {
  const { name, sections } = data;
  const formFields = (questions, section) => (
    questions.map((question, i) => (
      <div className="form-group" key={question.name}>
        <label htmlFor={`${section}${question.name}${i}`}>
          {question.name}
        </label>
        <FormField
          type={question.type}
          formId={`${section}${question.name}${i}`}
          makeSignaturePad={makeSignaturePad}
        />
      </div>
    ))
  );

  return (
    <form
      onSubmit={onSubmit}
    >
      <h1 className="mb-4">{name}</h1>
      {sections && sections.map((section, i) => (
        <div key={`${section.name}`} className="border border-warning mb-5 p-4">
          <h2 className="h4">
            <small className="text-muted">
              Section {i + 1}:
            </small> {formatName(section.name)}
          </h2>

          <div>
            {formFields(section.questions, `Section${i + 1}`)}
            {section.repeatable &&
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => addNewSection(section.name)}
              >
                Add another {formatName(section.name)}
              </button>
            }
          </div>
        </div>
      ))}

      {!data.name && (
        <p className="text-secondary text-center">
          Select a form from the dropdown in the header
        </p>)
      }

      {data.name &&
        <button
          type="submit"
          className="btn btn-warning btn-lg"
        >
          Submit
        </button>
      }
    </form>
  );
};


Form.propTypes = {
  data: PropTypes.shape({
    sections: PropTypes.array,
  }),
  onSubmit: PropTypes.func,
  makeSignaturePad: PropTypes.func,
  addNewSection: PropTypes.func,
  formatName: PropTypes.func,
};

export default Form;
