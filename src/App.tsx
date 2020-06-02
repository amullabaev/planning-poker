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
      return ApiService.registerUser().then(() => this.getScores())
    }
    return this.getScores()
  }

  public render() {
    console.log(this.getSelectedTask());
    return (
      <div className="App">
        <StartGame/>
        <Tasks scores={this.state.scores} onSelect={this.taskSelected}/>
        <Votes scores={this.state.scores} selectedTask={this.getSelectedTask()}/>
        <Cards selectedTask={this.getSelectedTask()}/>
        <span style={{color: 'lightgray'}}>PRE ALPHA TEST MVP v.0.0.010100111001</span>
        <br/>
        <button onClick={this.clearUsers}>Clear users</button>
        <button onClick={this.clearTasks}>Clear tasks</button>
      </div>
    );
  }

  private getSelectedTask = () => {
    const activeTask = Object.entries(this.state.scores.tasks).filter((i: any) => i[1].active)[0]
    return activeTask ? activeTask[0] : undefined
  }

  private clearUsers = () => {
    ApiService.clearUsers()
  }

  private clearTasks = () => {
    ApiService.clearTasks()
  }

  private wsHandler = () => {
    const ws = new WebSocket('ws://localhost/ws')
    // const ws = new WebSocket('wss://amirkhan.herokuapp.com/ws')
    ws.onmessage = ({data}) => {
      console.log('[WS MESSAGE]', data);
      if (data === 'clearUsers') {
        document.cookie = 'pokerName='
      }
      this.getScores()
    }
  }

  private taskSelected = (task: string) => {
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
