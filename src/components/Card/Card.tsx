import React, {useState} from 'react';
import './Card.css'
import {ICardProps} from './Card.interface';

export const Card: React.FC<ICardProps> = (props: ICardProps) => {

    const [randomStyle, setRandomStyle] = useState()

    const getRandomSelectedStyle = (): string => {
        const cssClassName = `selected${getRandomNumberFrom1to5()}`;
        if (cssClassName === randomStyle) {
            return getRandomSelectedStyle();
        }
        return cssClassName;
    }

    const getRandomNumberFrom1to5 = () => Math.floor(Math.random() * 5) + 1

    const cardSelected = () => {
        setRandomStyle(getRandomSelectedStyle())
        props.cardSelected(props.card);
    }



    return (
        <div className={`card ${props.card.color} ${props.isSelected && randomStyle}`}
             onClick={() => cardSelected()}>
            <span className={'label-small'}>{props.card.value}</span>
            {props.card.value}
        </div>
    )
}
