import { Component } from 'react';
import { ApiService } from '../../api/api';
import { getNameFromCookies } from '../../utils/utils';
import './StartGame.css';

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
      <div className={'start-page'}>
        <div className={'start-form'}>
          <span>Input your name</span>
          <input placeholder="Name" value={this.state.name} onChange={this.changeName} />
          <button onClick={this.start}>Start the game!</button>
        </div>
      </div>
      : null
  }

  private changeName = (event: any) => {
    this.setState({ name: event.target.value })
  }

  private start = async () => {
    if (this.state.name.length) {
      document.cookie = `pokerName=${this.state.name}`
      await ApiService.registerUser();
      this.setState({ isReady: true })
    }
  }
}
