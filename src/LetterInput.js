import React from 'react';
import {PropTypes} from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import ClearButton from "@material-ui/icons/Clear";
import CreateButton from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";

import "./LetterInput.css";

const capsLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const capsLettersAndSymbols = capsLetters + "-'";

const numberOfLetters = 16;

class LetterInput extends React.Component {
  constructor(props) {
    super(props);
    let selectedLetters = [];
    if (this.props.defaultValue !== undefined) {
      selectedLetters = this.props.defaultValue.split("").map((l) => [l]);
    }
    selectedLetters = selectedLetters.concat(
        [...Array(numberOfLetters - selectedLetters.length).keys()].map(() => [])
    );
    this.state = {
      selectedLetters,
      isErasing: false,
    };
  }

  isFilledCorrectly() {
    return this.state.selectedLetters.every((ls) => ls.length <= 1);
  }

  readLetters() {
    return this.state.selectedLetters.map((ls) => ls.join("")).join("");
  }

  setIsErasing(b) {
    this.setState({
      isErasing: b,
    });
  }

  handleSelect(i, l) {
    const selectedLetters = JSON.parse(JSON.stringify(this.state.selectedLetters));
    if (this.state.isErasing) {
      if (this.state.selectedLetters[i].includes(l)) {
        selectedLetters[i] = selectedLetters[i].filter((l_) => l_ !== l);
        this.setState({selectedLetters});
      }
    } else {
      selectedLetters[i].push(l);
      this.setState({selectedLetters});
    }

  }

  render() {
    const lettersSet = [capsLetters].concat(
        [...Array(this.state.selectedLetters.length - 3).keys()].map(() => capsLettersAndSymbols).concat(
            [capsLetters, capsLetters]));
    console.log(lettersSet.length);
    return (
        <div>
          <Dialog fullScreen
                  open={this.props.isOpen}
          >
            <AppBar position="sticky">
              <Toolbar className="fst-name-toolbar">
                <Typography variant="h5" className="fst-name-typography">
                  {this.props.title}
                </Typography>
                <IconButton
                    edge="start"
                    color="inherit"
                    disabled={!this.isFilledCorrectly()}
                    onClick={() => this.props.onExit(this.readLetters())}
                    aria-label="done"
                >
                  <DoneIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className="letter-parent">
              {[...Array(this.state.selectedLetters.length).keys()].map((i) =>
                  <LetterColumn
                      key={"letter-col#" + i + "#" + this.state.selectedLetters[i]}
                      index={i}
                      onSelect={this.handleSelect.bind(this)}
                      selectedLetters={this.state.selectedLetters[i]}
                      letters={lettersSet[i].split("")}
                  />
              )}
            </div>
            <Fab
                key={"eraser#" + this.state.isErasing}
                aria-label="use pencil"
                className="fab1"
                disabled={this.state.isErasing}
                onClick={() => this.setIsErasing(true)}
            >
              <ClearButton/>
            </Fab>
            <Fab
                key={"pencil#" + this.state.isErasing}
                aria-label="use eraser"
                className="fab2"
                disabled={!this.state.isErasing}
                onClick={() => this.setIsErasing(false)}
            >
              <CreateButton/>
            </Fab>
          </Dialog>
        </div>
    )
  }
}

LetterInput.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
};

class LetterColumn extends React.Component {
  render() {
    return (
        <div className="letter-column">
          {this.props.letters.map((l) => {
            return (
                <LetterColumnCell
                    key={this.props.index + "#" + l + "#" + this.props.selectedLetters}
                    onSelect={(l) => this.props.onSelect(this.props.index, l)}
                    letter={l}
                    isSelected={this.props.selectedLetters.includes(l)}
                />
            );
          })}
        </div>
    )
  }
}

LetterColumn.propTypes = {
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class LetterColumnCell extends React.Component {
  render() {
    const classNames = ["letter-cell"];
    if (this.props.isSelected) {
      classNames.push("cell-selected");
    }
    return (
        <div
            className={classNames.join(" ")}
            onClick={() => this.props.onSelect(this.props.letter)}
        >
          {this.props.letter}
        </div>
    )
  }
}

LetterColumnCell.propTypes = {
  onSelect: PropTypes.func.isRequired,
  letter: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default LetterInput;
