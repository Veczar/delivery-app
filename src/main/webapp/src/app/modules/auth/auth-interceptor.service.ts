import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    var authRequest;
    
    if (!this.authService.isTokenExpired() || token !== null) {
        console.log(token)
        authRequest = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(authRequest);
    }
    else {
      return next.handle(request);
    }
  }
}
