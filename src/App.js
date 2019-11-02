import React from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import './App.css';
import LetterInput from "./LetterInput";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstNameInputOpen: false,
      firstNameInputValue: "",
      lastNameInputOpen: false,
      lastNameInputValue: "",
    };
  }

  handleFirstNameInputOpen() {
    this.setState({
      firstNameInputOpen: true,
    });
  }

  handleFirstNameInputClose(name) {
    this.setState({
      firstNameInputOpen: false,
      firstNameInputValue: name,
    });
  }

  handleLastNameInputOpen() {
    this.setState({
      lastNameInputOpen: true,
    });
  }

  handleLastNameInputClose(name) {
    this.setState({
      lastNameInputOpen: false,
      lastNameInputValue: name,
    });
  }

  render() {
    return (
        <div className="App">
          <Typography variant="h2">
            Registration Form
          </Typography>

          <TextField
              key={"first name field#" + this.state.firstNameInputOpen + "#" + this.state.firstNameInputValue}
              required
              label="First name"
              onFocus={this.handleFirstNameInputOpen.bind(this)}
              value={this.state.firstNameInputValue}
          />
          <LetterInput
              key={"first name form" + this.state.firstNameInputOpen + "#" + this.state.firstNameInputValue}
              title={"Fill in your first name"}
              isOpen={this.state.firstNameInputOpen}
              defaultValue={this.state.firstNameInputValue}
              onExit={this.handleFirstNameInputClose.bind(this)}
          />
          <TextField
              key={"last name field#" + this.state.lastNameInputOpen + "#" + this.state.lastNameInputValue}
              required
              label="Last name"
              onFocus={this.handleLastNameInputOpen.bind(this)}
              value={this.state.lastNameInputValue}
          />
          <LetterInput
              key={"last name form" + this.state.lastNameInputOpen + "#" + this.state.lastNameInputValue}
              title={"Fill in your last name"}
              isOpen={this.state.lastNameInputOpen}
              defaultValue={this.state.lastNameInputValue}
              onExit={this.handleLastNameInputClose.bind(this)}
          />
        </div>
    )
  }
}

export default App;
