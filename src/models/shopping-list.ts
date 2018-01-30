export class ShoppingList {
    name: string;
    description: string;
    aliments: Array<AlimentItem>;
    sharedWith: Array<string>;
}

export class AlimentItem {
    name: string;
    quantity: string;
    market: string;
}

export class Market {
    name: string;
    color: string;
    location?: string;
}