export type CardValue = number | '?' | 'Pass'

export interface ICard {
    value: CardValue;
    color: string;
}

export interface ICardProps {
    card: ICard;
    isSelected: boolean;
    cardSelected: (card: ICard) => any;
}
