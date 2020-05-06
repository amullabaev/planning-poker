import React from 'react';
import './Card.css'
import {ICardProps} from './Card.interface';

export const Card: React.FC<ICardProps> = (props: ICardProps) => {

    const getRandomSelectedStyle = (): string => {
        const randomNumber = Math.random()
        const randomFrom1to3 = randomNumber < 0.333 ? 1 : randomNumber < 0.666 ? 2 : 3;
        return `selected${randomFrom1to3}`;
    }

    return (
        <div className={`card ${props.card.color} ${props.isSelected && getRandomSelectedStyle()}`}
             onClick={() => props.cardSelected(props.card)}>
            <span className={'label-small'}>{props.card.value}</span>
            {props.card.value}
        </div>
    )
}
