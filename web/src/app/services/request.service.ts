import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getListRequest():Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/charities/get`);
  }

  createRequest( userId:any, titre:any, description:any, adresse:any,phoneNumber:any, email:any ):Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}/charities/create`, { userId, titre, description, adresse,phoneNumber, email });
  }

  updateRequest(id:any, titre:any, description:any, adresse:any,phoneNumber:any, email:any):Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}/charities/update/${id}`, {titre, description, adresse,phoneNumber, email});
  }

  deleteRequest(id:any):Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}/charities/remove/${id}`);
  }

}
