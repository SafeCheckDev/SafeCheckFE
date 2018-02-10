/* global SignaturePad:true */

import React from 'react';
import Form from './Form';
import Header from './Header/Header';
import Logo from '../images/safecheck-logo-white.png';
import data from '../../endpoints';

let signaturePad;

class App extends React.Component {
  static makeSignaturePad(canvas) {
    if (canvas) {
      signaturePad = new SignaturePad(canvas);
    }
  }

  static formatName(name) {
    const newNameArr = name.split(' ');
    if (newNameArr.length > 1) {
      newNameArr.pop();
    }

    return newNameArr[0];
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      submitted: false,
      showDemo: false,
      count: 1,
    };

    this.submitForm = this.submitForm.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.showDemo = this.showDemo.bind(this);
    this.addNewSection = this.addNewSection.bind(this);
  }

  addNewSection(sectionName) {
    const { sections } = this.state.data;
    const { count } = this.state;
    const newData = Object.assign({}, this.state.data);
    const newSections = [];

    sections.map((section) => {
      newSections.push(section);
      if (section.name === sectionName) {
        const copySection = Object.assign({}, section);
        this.setState({
          count: count + 1,
        });
        section.repeatable = false;
        copySection.name = `${App.formatName(copySection.name)} ${count}`;
        newSections.push(copySection);
      }
    });
    newData.sections = newSections;

    this.setState({ data: newData });
  }

  showDemo() {
    this.setState({ showDemo: true });
  }

  changeForm(e) {
    const form = e.target.value;
    const url = data.form;
    this.setState({ form });

    fetch(url)
      .then(response => response.json())
      .then(pageData => this.setState({ data: pageData }));
  }

  submitForm(e) {
    e.preventDefault();
    const f = e.target;
    const formData = Object.assign(this.state.data);

    formData.sections.map((section) => {
      section.questions.map((question, i) => {
        if (question.type !== 'SIGNATURE') {
          question.value = f.elements[i].value;
          f.elements[i].value = '';
        } else {
          question.value = signaturePad.toDataURL('image/svg+xml');
          signaturePad.clear();
        }
      });
    });

    console.log(formData);
    const options = {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(data.postUrl, options)
      .then(({ status }) => this.setState({ submitted: status === 200 }));
    return false;
  }

  render() {
    const { showDemo } = this.state;
    return (
      <div className="site-wrapper">
        {!showDemo &&
          <div className="cover-container text-center site-wrapper-inner">
            <div>
              <img src={Logo} alt="Logo" style={{ width: '50%', maxWidth: '350px' }} />
            </div>
            <div className="m-5">
              <button
                className="btn btn-light btn-lg"
                onClick={this.showDemo}
              >
                Demo
              </button>
            </div>
          </div>
        }
        {showDemo &&
          <div
            className="mb-5 site-wrapper"
            style={{
              background: '#fff',
              boxShadow: 'inset 0 0 5rem rgba(0,0,0,.1)',
            }}
          >
            <Header
              onChange={this.changeForm}
              value={this.state.form}
            />
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-10 offset-sm-1">
                  {this.state.submitted &&
                    <div className="alert alert-success">
                      We have recieved your information!
                    </div>
                  }
                  <Form
                    data={this.state.data}
                    onSubmit={this.submitForm}
                    makeSignaturePad={App.makeSignaturePad}
                    addNewSection={this.addNewSection}
                    formatName={App.formatName}
                  />
                </div>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

export default App;
