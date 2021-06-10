import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerInfo(): Observable<any> {

    if(localStorage.getItem('token') === null) {
      return throwError('No token');
    } else {
      const token = JSON.stringify({
        token: localStorage.getItem('token')
      });
      return this.http.post("http://localhost:3000/customer/customerinfo", {token: localStorage.getItem('token')}); 
    }
 }

 //------------ MACONOMY -----------------------
 addMaconomySystem(): Observable<any> {
  if(localStorage.getItem('token') === null) {
    return throwError('No token');
  } else {
    return this.http.post("http://localhost:3000/customer/customerinfo", {token: localStorage.getItem('token')}); 
  }
 }

 getMyMaconomySystems(): Observable<any> {
  if(localStorage.getItem('token') === null) {
    return throwError('No token');
  } else {
    const token = JSON.stringify({
      token: localStorage.getItem('token')
    });
    return this.http.post("http://localhost:3000/customer/customer-maconomy", {token: localStorage.getItem('token')}); 
  }
 }
}
