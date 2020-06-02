import React, { Component } from 'react';
import './StartGame.css';
import { getNameFromCookies } from '../../utils/utils';
import { ApiService } from '../../api/api';

export class StartGame extends Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      name: getNameFromCookies(),
      isReady: !!getNameFromCookies()
    }
  }

  public componentDidUpdate() {

  }

  public render = () => {
    return !this.state.isReady ?
      <div className={ 'start-page' }>
        <div className={ 'start-form' }>
          <span>Input your name</span>
          <input placeholder="Name" value={this.state.name} onChange={this.changeName}/>
          <button onClick={ this.start }>Start the game!</button>
        </div>
      </div>
      : null
  }

  private changeName = (event: any) => {
    this.setState({ name: event.target.value })
  }

  private start = () => {
    if (this.state.name.length) {
      document.cookie = `pokerName=${ this.state.name }`
      ApiService.registerUser()
        .then(() => this.setState({isReady: true}))
    }
  }
}
