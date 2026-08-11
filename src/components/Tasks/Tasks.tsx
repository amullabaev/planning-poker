import { MoreHorizontalIcon, Pencil, Trash2Icon } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Field, FieldContent, FieldLabel, FieldTitle } from '../ui/field';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import './Tasks.css';
import { Input } from '../ui/input';

export interface ITask {
  id: number;
  title: string;
  estimation?: number;
}

interface TaskProps {
  tasks: ITask[];
  onCreate(title: string): void;
  onEdit(task: ITask): void;
  onDelete(task: ITask): void;
  onSelect(task: ITask): void;
}

export function Tasks(props: TaskProps) {
  const [newTaskName, setNewTaskName] = useState('');

  const selectTask = (task: ITask) => {
    props.onSelect(task);
  };

  const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  const addTask = () => {
    props.onCreate(newTaskName);
    setNewTaskName('');
  };

  return (
    <div className="task-list">
      <div className="flex">
        <Input type="text" placeholder={'input a task'} value={newTaskName} onChange={changeTaskName} />
        <Button disabled={!newTaskName} onClick={addTask}>
          Add
        </Button>
      </div>

      <RadioGroup className="gap-1">
        {props.tasks.map((task, index) => (
          <FieldLabel key={task.id} htmlFor={'option-' + index} onClick={() => selectTask(task)}>
            <Field orientation="horizontal">
              <RadioGroupItem value={task.title} id={'option-' + index} />
              <FieldContent>
                <FieldTitle>{task.title}</FieldTitle>
              </FieldContent>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" aria-label="More Options">
                      <MoreHorizontalIcon />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => props.onEdit(task)}>
                      <Pencil />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" onClick={() => props.onDelete(task)}>
                      <Trash2Icon />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </div>
  );
}
