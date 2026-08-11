import { useEffect, useState } from 'react';
import { ApiService } from './api/api';
import './App.css';
import { Cards } from './components/Cards/Cards';
import { StartGame } from './components/StartGame/StartGame';
import { Tasks, type ITask } from './components/Tasks/Tasks';
import { Votes } from './components/Votes/Votes';
import { deleteTask, getAllTasks, saveTask } from './services/taskService';

export default function App() {
  const [showVotes, setShowVotes] = useState<boolean>(false);
  const [scores, setScores] = useState({ users: {}, tasks: {} });
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [session, setSession] = useState<string>(() => window.location.pathname.substring(1));

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await getAllTasks();
      setTasks(tasks);
    };
    loadTasks();
  }, []);

  const onShowHideVotes = () => {
    if (showVotes) {
      ApiService.hideVotes();
    } else {
      ApiService.showVotes();
    }
  };

  const getSelectedTask = () => {
    const activeTask = Object.entries(scores.tasks).filter((i: any) => i[1].active)[0];
    return activeTask ? activeTask[0] : '';
  };

  const onCreateTask = async (title: string) => {
    const newTask = await saveTask(title);
    setTasks([...tasks, newTask]);
  };

  const onTaskSelected = (task: ITask) => {
    console.log(task.title + ' selected');
  };

  const onTaskEdit = (task: ITask) => {
    console.log('on edit ', task.title);
  };

  const onTaskDelete = async (task: ITask) => {
    await deleteTask(task.id);
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className="App">
      {!session && <StartGame />}
      <Tasks
        tasks={tasks}
        onCreate={onCreateTask}
        onSelect={onTaskSelected}
        onEdit={onTaskEdit}
        onDelete={onTaskDelete}
      />
      <Votes scores={scores} selectedTask={getSelectedTask()} showVotes={showVotes} onShowHideVotes={onShowHideVotes} />
      <Cards selectedTask={getSelectedTask()} />
    </div>
  );
}
