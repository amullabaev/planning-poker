import React from 'react';
import './Card.css'
import { ICard, ICardProps } from './Card.interface';
export const Card: React.FC<ICardProps> = (props: ICardProps) => {

    const cardClicked = (card: ICard) => {
        console.log(card.value);
    }

    return (
        <div className={`card ${props.card.color}`} onClick={() => cardClicked(props.card)}>
            <span className={'label-small'}>{props.card.value}</span>
            {props.card.value}
        </div>
    )
}
