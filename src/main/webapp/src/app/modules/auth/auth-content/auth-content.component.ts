import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.axiosService.request("GET", "api/users", ()=>{})
    //   .then((response) => this.data = response.data);
    // this.getUsers().subscribe(
    //   (response) => this.data = response
    // );
  }

  getUsers() {
    this.getUsers2().subscribe((r)=>{
      this.data = r;
    })
  }

  getUsers2(): Observable<User[]> {
    console.log('GET request');
    return this.http.get<User[]>("http://localhost:8080/api/users");
  }


}
