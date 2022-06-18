import { Injectable } from '@angular/core';
import { Merchant } from '../models/Merchant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}

  getData(): Observable<Merchant[]> {
    var data = JSON.parse(localStorage.getItem('merchant-data')!);
    return data;
  }
}
