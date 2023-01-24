import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  login(email:any, password:any) {
    return this.http.post<any>(`${this.myAppUrl}/admin/signin`, { email, password });
  }

  profile(nom:any, prenom:any, email:any, password:any, id:any) {
    return this.http.put<any>(`${this.myAppUrl}/admin/profile/${id}`, { nom, prenom, email, password });
  }
}
