import React, { Component } from 'react';
import Dropdown from './Dropdown'
import './Dropdown.css'

class App extends Component {
  state = {
    menu: [
      { id: '1', value: 'lorem', label: 'Lorem', target: 'lorem' },
      { id: '2', value: 'ipsum', label: 'Ipsum', target: 'ipsum' },
      { id: '3', value: 'dolor', label: 'Dolor', target: 'dolor' },
      { id: '4', value: 'conse', label: 'Conse', target: 'conse' },
      { id: '5', value: 'adici', label: 'Adici', target: 'adici' }
    ]
  }

  handleClick (event, selected) {
    console.log('passed to parent', selected)
  }

  render() {
    const { menu } = this.state

    return (
      <div className="App">
        <Dropdown
          className="dropdown"
          children={menu}
          filter={false}
          isStored={false}
          onClick={(event, selected) => this.handleClick(event, selected)}/>
      </div>
    );
  }
}

export default App;
