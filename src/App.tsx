import React from 'react';
import './App.css';
import { Cards } from './components/Cards/Cards';
import { StartGame } from "./components/StartGame/StartGame";
import { Tasks } from './components/Tasks/Tasks';
import { getNameFromCookies } from './utils/utils';
import { ApiService } from './api/api';
import { Votes } from './components/Votes/Votes';

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      selectedTask: '',
      scores: {users: {}, tasks: {}}
    }
  }

  componentDidMount(): void {
    this.wsHandler()
    if (getNameFromCookies()) {
      ApiService.registerUser()
    }
    this.getScores()
  }

  public render() {
    return (
      <div className="App">
        <StartGame/>
        <Tasks scores={this.state.scores} onSelect={this.taskSelected}/>
        <Votes scores={this.state.scores}/>
        <Cards selectedTask={this.state.selectedTask}/>
      </div>
    );
  }

  private wsHandler = () => {
    // const ws = new WebSocket('ws://localhost:8081')
    const ws = new WebSocket('wss://amirkhan.herokuapp.com:8081')
    ws.onmessage = ({data}) => {
      console.log('[WS MESSAGE]', data);
      this.getScores()
    }
  }

  private taskSelected = (task: string) => {
    this.setState({selectedTask: task})
    ApiService.setTicketActive(task)
      .then((data: any) => {
        this.setState({scores: data})
      })
  }


  private getScores = () => {
    ApiService.getScores()
      .then((data: any) => {
        this.setState({scores: data})
      })
  }

}

export default App;
