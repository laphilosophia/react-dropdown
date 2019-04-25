import React, { Component } from 'react';
import Dropdown from './Dropdown'

class App extends Component {
  state = {
    menu: [
      { id: '1', value: 'lorem', label: 'Lorem Ipsum', target: 'lorem' },
      { id: '2', value: 'ipsum', label: 'Ipsum Dolor', target: 'ipsum' },
      { id: '3', value: 'dolor', label: 'Dolor Sit Amet', target: 'dolor' },
      { id: '4', value: 'conse', label: 'Consectetur', target: 'conse' },
      { id: '5', value: 'adici', label: 'Adicisping', target: 'adici' },
      { id: '6', value: 'lorem', label: 'Lorem Ipsum', target: 'lorem' },
      { id: '7', value: 'ipsum', label: 'Ipsum Dolor', target: 'ipsum' },
      { id: '8', value: 'dolor', label: 'Dolor Sit Amet', target: 'dolor' },
      { id: '9', value: 'conse', label: 'Consectetur', target: 'conse' },
      { id: '10', value: 'adici', label: 'Adicisping', target: 'adici' },
      { id: '11', value: 'lorem', label: 'Lorem Ipsum', target: 'lorem' },
      { id: '12', value: 'ipsum', label: 'Ipsum Dolor', target: 'ipsum' },
      { id: '13', value: 'dolor', label: 'Dolor Sit Amet', target: 'dolor' },
      { id: '14', value: 'conse', label: 'Consectetur', target: 'conse' },
      { id: '15', value: 'adici', label: 'Adicisping', target: 'adici' },
    ],
    selected: {}
  }

  handleClick (e, item) {
    this.setState({ selected: item }, () => {
      console.log('active selected:', this.state.selected)
    })
  }

  render() {
    const { menu } = this.state

    return (
      <div className="App">
        <Dropdown
          children={menu}
          filter={true}
          isStored={true}
          storeKey="sample-key"
          onClick={(e, item) => this.handleClick(e, item)}/>
      </div>
    );
  }
}

export default App;
