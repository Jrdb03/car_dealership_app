export interface VehiclesResponse {
  vehicles: Vehicle[];
}

export interface Vehicle {
    _id:         string;
    brand:       string;
    model:       string;
    year:        number;
    price:       number;
    stock:       number;
    description: string;
    images:      any[];
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
    imageKeys:   any[];
    imageUrl?:   string;
}
