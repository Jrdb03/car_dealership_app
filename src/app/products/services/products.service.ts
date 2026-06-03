import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Vehicle, VehiclesResponse } from '../interfaces/vehicle.interface';

const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class ProductsService {
    private http = inject(HttpClient);

    getProducts() {
        return this.http.get<Vehicle[]>(`${baseUrl}/vehicles`);
    }
}