import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getListUsers() {
    return this.http.get<any>(`${this.myAppUrl}/users/get`);
  }
}
