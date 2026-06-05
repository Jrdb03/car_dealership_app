import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Sale } from '../interfaces/sales.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class SalesService {

  private http = inject(HttpClient);

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${baseUrl}/sales`);
  }
}
