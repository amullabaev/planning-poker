import React from 'react';
import './Votes.css'
import { cards } from '../../config/cards';
import { ICard } from '../Card/Card.interface';

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
    this.setState({showVotes: !this.state.showVotes})
  }

  private getTotalScore = () => {
    let totalScore

    if (this.props.scores.tasks && this.props.selectedTask) {
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

    return this.state.showVotes && totalScore ? totalScore : 'n/a'
  }

  private getValue = (user: any) => {
    if (this.state.showVotes) {
      return this.props.scores.tasks[this.props.selectedTask][user]
    }
    return !!this.props.scores.tasks[this.props.selectedTask][user] ? 'voted' : 'waiting'
  }
}
