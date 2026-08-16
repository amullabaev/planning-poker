import { useState, type ChangeEvent } from 'react';
import './StartGame.css';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function StartGame() {
  const [sessionId, setSessionId] = useState<string>('');

  const setSession = (event: ChangeEvent<HTMLInputElement>) => {
    setSessionId(event.target.value);
  };

  return (
    <div className="start-page">
      <div className="start-form">
        <div>
          <Input placeholder="Join session by ID" className="m-1" onChange={setSession}></Input>
          <Button className="m-1" onClick={() => console.log(sessionId)} disabled={!sessionId}>
            Go
          </Button>
        </div>
        <span>or</span>
        <Button className="m-1">Create a new session</Button>
      </div>
    </div>
  );
}
