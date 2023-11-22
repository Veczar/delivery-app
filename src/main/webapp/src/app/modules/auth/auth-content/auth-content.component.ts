import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../axios.service';

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

  constructor(private axiosService: AxiosService) {
  }

  ngOnInit(): void {
    this.axiosService.request("GET", "api/users", ()=>{})
      .then((response) => this.data = response.data);
  }

}
