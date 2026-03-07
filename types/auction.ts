export enum AuctionStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export enum WeightUnit {
    TONS = 'tons',
    KG = 'kg',
    QUINTAL = 'quintal',
}

export interface AuctionSeller {
    _id: string;
    username: string;
    first_name?: string;
    last_name?: string;
}

export interface Auction {
    _id: string;
    seller: AuctionSeller;
    title: string;
    description: string;
    starting_price: number;
    current_price: number;
    quantity: number;
    unit: WeightUnit;
    harvest_date: string;
    location: string;
    start_time: string;
    end_time: string;
    status: AuctionStatus;
    winner?: AuctionSeller;
    winning_bid?: string;
    createdAt: string;
    updatedAt: string;
}
