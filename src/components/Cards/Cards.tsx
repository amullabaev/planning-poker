import React, {useState} from 'react';
import {cards} from '../../config/cards';
import {Card} from '../Card/Card';
import './Cards.css'
import {ICard} from "../Card/Card.interface";
import { ApiService } from '../../api/api';

export const Cards: React.FC<any> = (props) => {

    const [selected, setSelected] = useState()

    const onCardSelected = (card: ICard) => {
        setSelected(card.value)
        ApiService.vote(card, props.selectedTask)
    }

    return (
        <div className={'cards-row'}>
            {cards.map(card =>
                <Card card={card} key={card.value}
                      cardSelected={onCardSelected}
                      isSelected={selected === card.value}/>)
            }
        </div>
    )
}
