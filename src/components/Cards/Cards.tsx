import React, {useState} from 'react';
import {cards} from '../../config/cards';
import {Card} from '../Card/Card';
import './Cards.css'
import {ICard} from "../Card/Card.interface";
import { ApiService } from '../../api/api';

export class Cards extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            selected: ''
        }
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        // if ()
    }

    public render() {
        return (
          <div className={'cards-row'}>
              {cards.map(card =>
                <Card card={card} key={card.value}
                      cardSelected={this.onCardSelected}
                      isSelected={this.state.selected === card.value}/>)
              }
          </div>
        )
    }

    private onCardSelected = (card: ICard) => {
        if (this.props.selectedTask) {
            this.setState({selected: card.value})
            ApiService.vote(card, this.props.selectedTask)
        }
    }

}
