import React from 'react';
import { ApiService } from '../../api/api';
import { cards } from '../../config/cards';
import { Card } from '../Card/Card';
import { type ICard } from "../Card/Card.interface";
import './Cards.css';

export class Cards extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            selected: ''
        }
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
