import React from 'react';
import './Votes.css'
import { cards } from '../../config/cards';

export class Votes extends React.Component<any, any> {

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if (this.props.selectedTask !== prevProps.selectedTask) {
      this.props.onShowHideVotes(false)
    }
  }

  public render() {
    const users = Object.keys(this.props.scores.users)
    const activeTask = this.props.selectedTask
    return <>
      <div className={ 'votes-list' }>
        <button onClick={this.toggleVotes}>{this.props.showVotes ? 'Hide' : 'Show'} votes</button>

        { users.map((user: any) =>
          <div className={'votes'} key={ user } >
            <div style={{width: '100px'}}>{ user }:</div>
            <div style={{width: '100px'}}>{ activeTask && this.getValue(user) }</div>
          </div>

        ) }
        <br/>
        <span>Total: {this.getTotalScore()}</span>
      </div>
    </>
  }

  private toggleVotes = () => {
    this.props.onShowHideVotes(!this.props.showVotes)
  }

  private getTotalScore = () => {
    let totalScore

    if (this.props.scores.tasks && this.props.selectedTask && this.props.showVotes) {
      const values = Object.entries(this.props.scores.tasks[this.props.selectedTask])
        .filter((i: any) => i[0] !== 'active' && Number.isInteger(i[1]))
        .flatMap(i => i[1])
      // @ts-ignore
      const score = values.reduce((a, b) => a + b) / values.length
      const cardValues = cards.map((card: any) => card.value)
        .filter((i: any) => Number.isInteger(i))
        .sort((a: number, b: number ) => +a - +b)
      totalScore = cardValues.find(i => i >= score)
    }

    return totalScore ? totalScore : 'n/a'
  }

  private getValue = (user: any) => {
    if (this.props.showVotes) {
      return this.props.scores.tasks[this.props.selectedTask][user]
    }
    return !!this.props.scores.tasks[this.props.selectedTask][user] ? 'voted' : 'waiting'
  }
}
