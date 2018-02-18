export class ShoppingList {
    id?: string;
    name: string;
    ownerId: string;
    description: string;
    aliments: Array<AlimentItem>;
    sharedWith: Object;
    attachments: Array<string>;
}

export class AlimentItem {
    name: string;
    quantity: string;
    market: string;
    checked: boolean;
}

export class Attachment {
    name: string;
    size: number;
    ts: Date;
    url: string;
}

export class Market {
    id?: string;
    name: string;
    color: string;
    location?: string;
}