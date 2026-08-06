import { useState, type ChangeEvent } from 'react';
import { ApiService } from '../../api/api';
import { getNameFromCookies } from '../../utils/utils';
import './StartGame.css';

export function StartGame() {
  const [name, setName] = useState<string>(getNameFromCookies());
  const [isReady, setIsReady] = useState<boolean>(!name);

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const start = () => {
    if (name.length) {
      document.cookie = `pokerName=${name}`;
      ApiService.registerUser();
      setIsReady(true);
    }
  };

  return (
    !isReady && (
      <div className="start-page">
        <div className="start-form">
          <span>Input your name</span>
          <input placeholder="Name" value={name} onChange={changeName} />
          <button onClick={start}>Start the game!</button>
        </div>
      </div>
    )
  );
}
