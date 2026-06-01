import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Vehicle {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  precio: number;
  disponibilidad: number;
  imagen?: string;
}

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePage {
  vehicles: Vehicle[] = [
    {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: 2024,
      precio: 28500,
      disponibilidad: 3,
      imagen: 'https://via.placeholder.com/300x200?text=Toyota+Corolla',
    },
    {
      id: 2,
      marca: 'Honda',
      modelo: 'Civic',
      ano: 2024,
      precio: 31200,
      disponibilidad: 2,
      imagen: 'https://via.placeholder.com/300x200?text=Honda+Civic',
    },
    {
      id: 3,
      marca: 'BMW',
      modelo: 'X5',
      ano: 2023,
      precio: 65800,
      disponibilidad: 1,
      imagen: 'https://via.placeholder.com/300x200?text=BMW+X5',
    },
    {
      id: 4,
      marca: 'Mercedes-Benz',
      modelo: 'C-Class',
      ano: 2024,
      precio: 52400,
      disponibilidad: 0,
      imagen: 'https://via.placeholder.com/300x200?text=Mercedes+C-Class',
    },
    {
      id: 5,
      marca: 'Ford',
      modelo: 'Mustang',
      ano: 2023,
      precio: 45900,
      disponibilidad: 2,
      imagen: 'https://via.placeholder.com/300x200?text=Ford+Mustang',
    },
    {
      id: 6,
      marca: 'Audi',
      modelo: 'A4',
      ano: 2024,
      precio: 48700,
      disponibilidad: 1,
      imagen: 'https://via.placeholder.com/300x200?text=Audi+A4',
    },
  ];
}
