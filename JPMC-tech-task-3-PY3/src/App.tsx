import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,

}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false,
    };
  }

  renderGraph() {
    if (this.state.showGraph) {

      return (<Graph data={this.state.data} />)
    }
  }
  renderGraphBorder() {
    if (this.state.showGraph) {
      // console.log(this.state.data)
      let data_0 = this.state.data[0]
      let data_1 = this.state.data[1]
      let ratiox = (data_0.top_ask.price + data_0.top_bid.price) / 2
      let ratioy = (data_1.top_ask.price + data_1.top_bid.price) / 2
      let ratioxy = ratiox / ratioy
      if (ratioxy > 1.01 || ratioxy < 0.99) {
        return true
      }
      else {
        return false
      }
    }
  }


  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          Bank Merge & Co Task 3
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button" onClick={() => { this.getDataFromServer() }}>Start Streaming Data</button>
          <div className="Graph" style={this.renderGraphBorder() ? { border: '10px solid red' } : { border: '10px solid green' }}>
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
