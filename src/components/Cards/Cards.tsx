import React from 'react';
import { cards } from '../../config/cards';
import { Card } from '../Card/Card';
import './Cards.css'

export const Cards: React.FC = () => {
    return (
        <div className={'cards-row'}>
            {cards.map(card => <Card card={card} key={card.value}/>)}
        </div>
    )
}
