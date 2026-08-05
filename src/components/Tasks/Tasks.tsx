import { useState, type ChangeEvent } from 'react';
import './Tasks.css';

interface TaskProps {
  // TODO: make task: { id: string, title: string, ... }
  onSelect(task: string): void;
}

export function Tasks(props: TaskProps) {
  const [newTaskName, setNewTaskName] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState('');

  const selectTask = (task: string) => {
    setSelectedTask(task);
    props.onSelect(task);
  };

  const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  const addTask = () => {
    setTasks([...tasks, newTaskName]);
    setNewTaskName('');
    // TODO: save task
  };

  return (
    <div className="task-list">
      <input type="text" placeholder={'input a task'} value={newTaskName} onChange={changeTaskName} />
      <button disabled={!newTaskName} onClick={addTask}>
        Add
      </button>
      <div className="no-selected-task">{!selectedTask && 'Please select a task by clicking on it'}</div>
      {tasks.map((task) => (
        <div className="task-list-item" key={task}>
          <div className={task === selectedTask ? 'selected' : ''} onClick={() => selectTask(task)}>
            {task}
          </div>
        </div>
      ))}
    </div>
  );
}
