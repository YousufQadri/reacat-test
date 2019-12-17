import React, { Component } from "react";
import ProgressBar from "./ProgressBar";
import { Form, Radio, Button } from "antd";
import Fontawesome from "react-fontawesome";

const ButtonGroup = Button.Group;

class Quiz extends Component {
  state = {
    progress: 0,
    questions: [],
    asked: 0,
    currentQuestion: "",
    options: {
      label: "No Options!"
    },
    quesToAsk: {},
    userAnswer: 0,
    score: 0
  };
  UNSAFE_componentWillMount() {
    this.renderQuestion();
  }

  renderQuestion = () => {
    let questions = this.props.ques;
    console.log("quest:", questions);
    const { asked } = this.state;

    // Grabbed a single question data
    const quesToAsk = questions[asked];

    //Grabbing single QUES
    const currentQuestion = decodeURI(quesToAsk.question);

    //Grabbing Options of selected QUES
    const optionList = quesToAsk.incorrect_answers;
    optionList.push(quesToAsk.correct_answer);
    // //Preparing final options
    const options = optionList.map(option => ({
      label: decodeURI(option)
    }));
    console.log(options);
    // console.log(optionList);
    this.setState({
      quesToAsk,
      questions,
      currentQuestion,
      options
    });
  };

  showResult = () => {
    console.log("final");
  };

  nextQuestion = end => {
    const { questions, options, asked, userAnswer, score } = this.state;
    const quesAsked = questions[asked];
    if (options[userAnswer].label === decodeURI(quesAsked.correct_answer)) {
      this.setState({ score: score + 10 });
    }
    this.setState({ asked: asked + 1 }, () =>
      !end ? this.renderQuestion() : this.showResult()
    );
    this.increase();
  };

  increase = () => {
    let progress = this.state.progress + 5;
    if (progress > 100) {
      progress = 100;
    }
    this.setState({ progress });
  };

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      userAnswer: e.target.value
    });
  };
  render() {
    const {
      questions,
      asked,
      currentQuestion,
      options,
      quesToAsk
    } = this.state;
    console.log("op", quesToAsk);
    return (
      <div>
        <ProgressBar
          increase={() => this.increase}
          progress={this.state.progress}
        />
        <div>
          Question {asked} of {questions.length}
          <br />
          <small>Entertainment: {decodeURI(quesToAsk.category)}</small>
          <p>Ratings:</p>
          {quesToAsk.difficulty}
          <h5 style={{ marginBottom: 30 }}>{currentQuestion}</h5>
          <Radio.Group
            onChange={() => this.onChange}
            value={() => this.state.userAnswer}
          >
            {options.map(op => (
              <Radio value={1}>{op.label}</Radio>
            ))}
          </Radio.Group>
        </div>
        <ButtonGroup style={{ marginTop: 30 }}>
          {questions.length <= asked + 1 ? (
            <Button type="primary" onClick={() => this.nextQuestion("end")}>
              Finish
            </Button>
          ) : (
            <Button type="primary" onClick={() => this.nextQuestion()}>
              Next
            </Button>
          )}
          {/* <Button onClick={this.nextQuestion} icon="plus" /> */}
        </ButtonGroup>
      </div>
    );
  }
}

export default Quiz;
