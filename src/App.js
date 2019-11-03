import React from 'react';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import './App.css';
import LetterInput from "./LetterInput";
import DateInput from "./DateInput";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstNameInputOpen: false,
      firstNameInputValue: "",
      lastNameInputOpen: false,
      lastNameInputValue: "",
      dobInputOpen: false,
      dobInputValue: "",
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

  handleDobInputOpen() {
    this.setState({
      dobInputOpen: true,
    });
  }

  handleDobInputClose(date) {
    this.setState({
      dobInputOpen: false,
      dobInputValue: date,
    });
  }

  render() {
    return (
        <div className="App">
          <br/>
          <br/>
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
          <TextField
              key={"dob#" + this.state.dobInputValue}
              required
              label="Year of birth"
              onFocus={this.handleDobInputOpen.bind(this)}
              value={this.state.dobInputValue}
          />
          <DateInput
              title={"Pick your year of birth"}
              isOpen={this.state.dobInputOpen}
              onExit={this.handleDobInputClose.bind(this)}
              defaultValue={this.state.dobInputValue}/>

          <br/>
          <Button
              className="submit-btn"
              color="primary"
              variant="contained"
              disabled={this.state.dobInputValue < 2001}
              onClick={() => window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
          >
            Submit
          </Button>
        </div>
    )
  }
}

export default App;
