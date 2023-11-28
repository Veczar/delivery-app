import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {

  constructor(private modalService: NgbModal, private router: Router) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }

}
