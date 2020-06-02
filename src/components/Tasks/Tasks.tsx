import React, { Component } from 'react';
import { ApiService } from '../../api/api';
import './Tasks.css'

export class Tasks extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      newTaskName: '',
      // taskList: [],
      selectedTask: ''
    }
  }

  componentDidMount(): void {
    // this.getTaskList()
  }

  public render = () => {
    const tasks = Object.keys(this.props.scores.tasks)
    return <div className={'task-list'}>
      <input type="text" placeholder={'input a task'} value={this.state.newTaskName} onChange={this.changeTaskName}/>
      <button onClick={this.addTask}>add</button>
      {tasks.map((task: string) =>
        <div className={'task-list-item'} key={task}>
          <div className={this.props.scores.tasks[task].active ? 'selected' : ''}
               onClick={() => this.selectTask(task)}>{task}</div>
          <div></div>
        </div>

      )}
    </div>
  }

  private selectTask = (task: string) => {
    this.setState({selectedTask: task})
    this.props.onSelect(task)
  }

  // private getTaskList = () => {
  //   ApiService.getTickets()
  //     .then((data: any) => {
  //       this.setState({taskList: data})
  //     })
  // }

  private changeTaskName = (e: any) => {
    this.setState({newTaskName: e.target.value})
  }

  private addTask = () => {
    if (this.state.newTaskName) {
      ApiService.addTicket(this.state.newTaskName)
        .then((data: any) => {
          this.setState({newTaskName: ''})
        })
    }
  }
}
