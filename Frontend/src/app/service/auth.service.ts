import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

   login(username: string, password: string): Observable<any> {
     return this.http.post("http://localhost:3000/login", {"Username": username, "Password": password}); 
  }


  signup(username: string, password: string, email: string): Observable<any> {
    return this.http.post("http://localhost:3000/signup", {"Username": username, "Password": password, "Email": email}); 
 }

   setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
} 

// ----------------------------
// Not sure if we should use this code, however, its kept just in case.
public isLoggedIn() {
  return moment().isBefore(this.getExpiration());
}

    logout(): void {
      localStorage.clear();
      this.router.navigate(['']);
    }

getExpiration() {
  const expiration = localStorage.getItem("expires_at");
  const expiresAt = JSON.parse(expiration || '');
  return moment(expiresAt);
}  
// ----------------------------
//   handleError(error: any) {
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//         // client-side error
//         errorMessage = `Error: ${error.error.message}`;
//     } else {
//         // server-side error
//         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.log(errorMessage);
//     console.log(error);
//     return throwError(errorMessage);
// }
}
