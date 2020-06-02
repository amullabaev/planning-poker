import React from 'react';
import './Votes.css'

export class Votes extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const users = Object.keys(this.props.scores.users)
    const activeTask = Object.keys(this.props.scores.tasks).filter((task => {
      return this.props.scores.tasks[task].active
    }))[0]
    console.log(activeTask);
    return <> { !!Object.keys(this.props.scores.tasks).length &&
    <div className={ 'votes-list' }>
      { users.map((user: any) =>
        <div key={ user }>{ user } : {activeTask && this.props.scores.tasks[activeTask][user] }</div>
      ) }
    </div>
    }
    </>
  }
}
