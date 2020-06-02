import React from 'react';
import './Votes.css'

export class Votes extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state ={
      showVotes: false
    }
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if (this.props.selectedTask !== prevProps.selectedTask) {
      this.setState({showVotes: false})
    }
  }

  public render() {
    const users = Object.keys(this.props.scores.users)
    const activeTask = this.props.selectedTask
    return <>
      <div className={ 'votes-list' }>
        <button onClick={this.toggleVotes}>{this.state.showVotes ? 'Hide' : 'Show'} votes</button>

        { users.map((user: any) =>
          <div className={'votes'}>
            <div key={ user } style={{width: '100px'}}>{ user }:</div>
            <div style={{width: '100px'}}>{ activeTask && this.getValue(user) }</div>
          </div>

        ) }
      </div>
    </>
  }

  private toggleVotes = () => {
    this.setState({showVotes: !this.state.showVotes})
  }

  private getValue = (user: any) => {
    console.log(this.props.scores.tasks[this.props.selectedTask][user]);
    if (this.state.showVotes) {
      return this.props.scores.tasks[this.props.selectedTask][user]
    }
    return !!this.props.scores.tasks[this.props.selectedTask][user] ? 'voted' : 'waiting'
  }
}
