import React, { Component } from 'react';

const currentWhitelistStub = [
  {label: 'Baby Shark Dance | Sing and Dance! | Animal Songs | PINKFONG Songs for Children', url: 'https://www.youtube.com/watch?v=XqZsoesa55w'},
  {label: 'Sesame Street: If You\'re Happy and You Know It | Elmo\'s Sing-Along', url: 'https://www.youtube.com/watch?v=5015skRvqs8'},
  {label: 'If You’re Happy and You Know It + More Baby Songs by Dave and Ava', url: 'https://www.youtube.com/watch?v=WbUP2PO9gFI'}
]

class Dashboard extends Component {
  state = {
    value: '',
    whiteList: currentWhitelistStub
  }

  handleChange = event => {
    this.setState({value: event.target.value})
  }

  handleRemove = (key) => {
    const listLength = this.state.whiteList.length;
    const newList = [...this.state.whiteList.slice(0, key), ...this.state.whiteList.slice(key + 1, listLength)];
    this.setState({whiteList: newList});
    
  }

  handleSubmit = event => {
    event.preventDefault();
    const newList = [...this.state.whiteList, this.state.value];
    
    this.setState({whiteList: newList, value: ''});
  }

  render() {
    return(
      <div className="whitelist">
        <h1>White List</h1>
        <form className="whitelist__form" onSubmit={this.handleSubmit}>
        <label>
          Label<input name="label" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <label>
        URL<input name="url" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <button>Add</button>
        </form>
        {this.state.whiteList.map((video, key) => {
          return (
          <div className="whitelist__item" key={key}>
          <span>{video.label}</span>
          <span className="whitelist__url">{video.url}
          <i className="fas fa-times-circle" onClick={() => this.handleRemove(key)}></i>
          </span>
          </div>
          )
        })}
      </div>
    )
  }
}

export default Dashboard;
