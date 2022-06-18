import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  public sendToken(token: any) {
    return this.http.post<any>('http://localhost:3000/token_validate', {
      recaptcha: token,
    });
  }
}
