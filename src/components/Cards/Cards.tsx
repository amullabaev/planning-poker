import { useState } from 'react';
import { ApiService } from '../../api/api';
import { cards } from '../../config/cards';
import { Card } from '../Card/Card';
import { type ICard } from '../Card/Card.interface';
import './Cards.css';

export function Cards({ selectedTask }: { selectedTask: string }) {
  const [selected, setSelected] = useState<string>();

  function onCardSelected(card: ICard) {
    if (selectedTask) {
      setSelected(card.value.toString());
      ApiService.vote(card, selectedTask);
    }
  }

  return (
    <div className={'cards-row'}>
      {cards.map((card) => (
        <Card card={card} key={card.value} cardSelected={onCardSelected} isSelected={selected === card.value} />
      ))}
    </div>
  );
}
