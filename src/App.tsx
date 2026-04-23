import React, { useEffect } from 'react';
import './App.css';
import { Cards } from './components/Cards/Cards';
import { StartGame } from './components/StartGame/StartGame';
import { Tasks } from './components/Tasks/Tasks';
import { getNameFromCookies } from './utils/utils';
import { ApiService } from './api/api';
import { Votes } from './components/Votes/Votes';

export default function App() {
  const [showVotes, setShowVotes] = React.useState<boolean>(false);
  const [scores, setScores] = React.useState({ users: {}, tasks: {} });

  useEffect(() => {
    wsHandler();
    if (getNameFromCookies()) {
      ApiService.registerUser().then(() => getScores());
    }
    return getScores();
  }, []);

  const onShowHideVotes = (show: boolean) => {
    if (show) {
      ApiService.showVotes();
    } else {
      ApiService.hideVotes();
    }
  };

  const getSelectedTask = () => {
    const activeTask = Object.entries(scores.tasks).filter((i: any) => i[1].active)[0];
    return activeTask[0] ?? '';
  };

  const clearUsers = () => {
    ApiService.clearUsers();
  };

  const clearTasks = () => {
    ApiService.clearTasks();
  };

  const wsHandler = () => {
    const ws = new WebSocket('wss://amirkhan.herokuapp.com/ws');
    ws.onmessage = ({ data }) => {
      console.log('[WS MESSAGE]', data);
      if (data === 'clearUsers') {
        document.cookie = 'pokerName=';
      } else if (data === 'showVotes') {
        setShowVotes(true);
      } else if (data === 'hideVotes') {
        setShowVotes(false);
      }
      getScores();
    };
  };

  const taskSelected = (task: string) => {
    ApiService.setTicketActive(task).then((data: any) => {
      setScores(data);
    });
  };

  const getScores = () => {
    ApiService.getScores().then((data: any) => {
      setScores(data);
    });
  };

  return (
    <div className="App">
      <StartGame />
      <Tasks scores={scores} selectedTask={getSelectedTask()} onSelect={taskSelected} />
      <Votes scores={scores} selectedTask={getSelectedTask()} showVotes={showVotes} onShowHideVotes={onShowHideVotes} />
      <Cards selectedTask={getSelectedTask()} />
      <span style={{ color: 'lightgray' }}>PRE ALPHA TEST MVP v.0.0.010100111001</span>
      <br />
      <button onClick={clearUsers}>Clear users</button>
      <button onClick={clearTasks}>Clear tasks</button>
    </div>
  );
}
