import React, {useState} from 'react';
import {cards} from '../../config/cards';
import {Card} from '../Card/Card';
import './Cards.css'
import {ICard} from "../Card/Card.interface";

export const Cards: React.FC = () => {

    const [selected, setSelected] = useState()

    const onCardSelected = (card: ICard) => {
        setSelected(card.value)
    }

    return (
        <div className={'cards-row'}>
            {cards.map(card =>
                <Card card={card} key={card.value} cardSelected={onCardSelected} isSelected={selected === card.value}/>)
            }
        </div>
    )
}
