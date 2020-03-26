import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    counter: 0,
    arr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    text: '',
    name: [],
    resetForm: ''
  };

  increment = () => {
    this.setState(prevState => {
      return { counter: prevState.counter + 1 };
    });
  };

  decrement = () => {
    this.setState(prevState => {
      return { counter: prevState.counter - 1 };
    });
  };

  reset = () => {
    this.setState({ counter: 0 });
  };

  addElement = element => {
    // element = prompt('Enter new element');
    let cloneArr = [...this.state.arr];
    cloneArr.push(element);
    this.setState({ arr: cloneArr });
  };

  editElement = idx => {
    return () => {
      let newContent = prompt('Edit your name');
      let array = this.state.name.map((item, index) => {
        if (idx === index) {
          return newContent;
        } else {
          return item;
        }
      });
      this.setState({ name: array });
    };
  };

  removeElement = idx => {
    return () => {
      let array = this.state.name.filter((item, index) => index !== idx);
      this.setState({ name: array });
    };
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const cloneName = this.state.name;
    cloneName.push(this.state.text);
    this.setState({ name: cloneName });
    this.setState({ text: this.state.resetForm });
  };

  render() {
    return (
      <div>
        <h1>Counter: {this.state.counter}</h1>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <button onClick={this.reset}>Reset</button>

        <div>
          <button onClick={this.addElement}>Add Element</button>
          <h1>This is a list</h1>
          <ul>
            {this.state.arr.map((item, idx) => (
              <li key={idx}>
                {item} <button>X</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <form>
            <label>
              Name:
              <input
                type="text"
                value={this.state.text}
                onChange={this.handleChange}
              />
            </label>
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
          {this.state.name.map((item, index) => (
            <h1 key={index}>
              Your Name is: {item}{' '}
              <button onClick={this.editElement(index)}>Edit</button>
              <button onClick={this.removeElement(index)}>Delete</button>
            </h1>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
