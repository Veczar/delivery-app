import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    var authRequest;
    
    if (!this.authService.isTokenExpired() || token !== null) {
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
