import { useState } from 'react';
import './Card.css';
import { type ICardProps } from './Card.interface';

export function Card(props: ICardProps) {
  const [randomStyle, setRandomStyle] = useState<string>();

  function cardSelected() {
    setRandomStyle(getRandomSelectedStyle());
    props.cardSelected(props.card);
  }

  function getRandomSelectedStyle(): string {
    const cssClassName = `selected${getRandomNumberFrom1to5()}`;
    if (cssClassName === randomStyle) {
      return getRandomSelectedStyle();
    }
    return cssClassName;
  }

  const getRandomNumberFrom1to5 = () => Math.floor(Math.random() * 5) + 1;

  return (
    <div className={`card ${props.card.color} ${props.isSelected && randomStyle}`} onClick={cardSelected}>
      <span className={'label-small'}>{props.card.value}</span>
      {props.card.value}
    </div>
  );
}
