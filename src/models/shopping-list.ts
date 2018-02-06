export class ShoppingList {
    id?: string;
    name: string;
    ownerId: string;
    description: string;
    aliments: Array<AlimentItem>;
    sharedWith: Object;
}

export class AlimentItem {
    name: string;
    quantity: string;
    market: string;
    checked: boolean;
}

export class Market {
    id?: string;
    name: string;
    color: string;
    location?: string;
}