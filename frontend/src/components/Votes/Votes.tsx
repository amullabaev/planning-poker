import './Votes.css';
import { CARDS } from '../../config/cards';

interface VotesProps {
  showVotes: boolean;
  selectedTask: string;
  scores: {
    tasks: {
      [taskname: string]: {
        [username: string]: number;
      };
    };
    users: {};
  };
  onShowHideVotes(): void;
}

export function Votes(props: VotesProps) {
  const getTotalScore = () => {
    let totalScore;

    if (props.scores.tasks && props.selectedTask && props.showVotes) {
      const values = Object.entries(props.scores.tasks[props.selectedTask])
        .filter((tasks) => tasks[0] !== 'active' && Number.isInteger(tasks[1]))
        .flatMap((i) => i[1]);

      const score = values.reduce((a, b) => a + b) / values.length;

      const cardValues = CARDS.map((card) => card.value)
        .filter(Number.isInteger)
        .sort((a, b) => +a - +b);

      totalScore = (cardValues as number[]).find((i) => i >= score);
    }

    return totalScore ?? 'n/a';
  };

  const getUserEstimation = (username: string) => {
    if (props.showVotes) {
      return props.scores.tasks[props.selectedTask][username];
    }
    return !!props.scores.tasks[props.selectedTask][username] ? 'voted' : 'waiting';
  };

  const usernames = Object.keys(props.scores.users);

  return (
    <div className="votes-list">
      <button onClick={props.onShowHideVotes}>{props.showVotes ? 'Hide' : 'Show'} votes</button>
      {usernames.map((name) => (
        <div className="votes" key={name}>
          <div>{name}:</div>
          <div>{props.selectedTask && getUserEstimation(name)}</div>
        </div>
      ))}
      <br />
      <span>Total: {getTotalScore()}</span>
    </div>
  );
}
