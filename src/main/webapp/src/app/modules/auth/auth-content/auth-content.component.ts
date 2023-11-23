import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../axios.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface User {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.scss']
})
export class AuthContentComponent implements OnInit {
  data: User[] = [];

  constructor(private axiosService: AxiosService, private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.axiosService.request("GET", "api/users", ()=>{})
    //   .then((response) => this.data = response.data);
    this.getUsers().subscribe(
      (response) => this.data = response
    );
  }

  getUsers(): Observable<User[]> {
    console.log('GET request');
    return this.http.get<User[]>("http://localhost:8080/api/users");
  }

  

}
