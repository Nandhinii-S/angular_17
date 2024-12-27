import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }



  login(loginData: LoginSchema): Observable<LoginSchema> {
    return this.http.post<LoginSchema>(`${environment.API_BASE_URL}login`, loginData);
  }
}
export interface LoginSchema {
  email: string;
  password: string;
}
