import { Component, OnInit } from '@angular/core';
import { AddressDto, PartnerDto, PartnerReviewReadDto, ProductReadDto } from 'src/app/shared/model/api-models';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from '../../auth/auth.service';
import { ShoppingCartService } from '../../../shared/navbar/shopping-cart/shopping-cart.service';
import { PartnerService } from '../../partner/partner.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-partner-products',
  templateUrl: './partner-products.component.html',
  styleUrls: ['./partner-products.component.scss']
})
export class PartnerProductsComponent implements OnInit {

  products: ProductReadDto[] = [];
  address!: AddressDto;
  partner!: PartnerDto;
  partnerName: string = '';
  searchText!: string;
  selectedCategory: string | null = null;
  categories: string[] = [];
  reviewsCount: number = 0;
  rating: number = 0;
  owner: boolean = false;
  selectedProduct!: ProductReadDto;
  reviews: PartnerReviewReadDto[] = [];
  palceholders!: number[];

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private http: HttpClient,
    private toastService: ToastService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private partnerService: PartnerService,
    public sanitizer: DomSanitizer
  ) {
    this.updateAuthenticationState();
    this.palceholders = Array(3).fill(1);
  }

  private updateAuthenticationState() {
    if (this.isUserLoggedIn()) {
      this.loggedUser = this.authService.getLoggedUser();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const partnerName = params['partner'];
      // console.log('name: ', partnerName);

      this.partnerService.getPartnerByName(partnerName).subscribe((partner) => {
        this.partner = partner;
        this.address = partner.owner.addresses[0];
        // console.log(partner)

        const id: number = Number(localStorage.getItem('id') || 0);
        if (partner.owner.id === id) {
          this.owner = true;
        }

        this.http.get<PartnerReviewReadDto[]>(`http://localhost:8080/api/partners/reviews/partner/${partner.id}`).subscribe((reviews) => {
          this.reviewsCount = reviews.length;
          this.reviews = reviews;
          // calculate rating
          if (this.reviewsCount > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + (review.gradeInStars || 0), 0);
            this.rating = totalRating / this.reviewsCount;
          }
        });
      })

      this.productService.getProductsFromPartner(partnerName).subscribe(products => {
        this.products = products;
        this.initCategories(products);
      });
    })
  }

  initCategories(products: ProductReadDto[]): void {
    // Extract categories from products
    const allCategories: string[] = products.flatMap(product =>
      product.categories ? product.categories.map(category => category.name || '') : []
    );

    // Filter out duplicates
    this.categories = Array.from(new Set(allCategories)).sort();
  }

  selectCategory(category: string): void {
    // Toggle selection
    this.selectedCategory = this.selectedCategory === category ? null : category;
    this.searchText = this.selectedCategory || '';
  }

  clearSelection(): void {
    // Clear selected category
    this.selectedCategory = null;
    this.searchText = '';
  }

  openModal(modal: any): void {
    this.modalService.open(modal);
  }

  openProductModal(modal: any, product: ProductReadDto): void {
    this.selectedProduct = product;
    this.modalService.open(modal);
  }

  getTotal(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  navigateToExternalUrl(): void {
    const externalUrl = this.partner.websiteLink || '';
    const fullUrl = 'https://' + externalUrl;

    // Open the external URL in a new window
    window.open(fullUrl, '_blank');
  }

  partnerChanged(): void {
    this.partnerService.getPartnerById(this.partner.id as number).subscribe(partner => {
      this.partner = partner;
    });
  }

  productsChanged(): void {
    this.productService.getProductsFromPartner(this.partner.name as string).subscribe(products => {
      this.products = products;
      this.initCategories(products);
    });
    this.modalService.dismissAll();
  }

  open(modal: any): void {
    this.modalService.open(modal);
  }

  isUserLoggedIn(): any {
    return this.authService.isUserLogged();
  }

  getUrl(address : AddressDto)
  {
    return "https://www.google.com/maps/embed/v1/place?key=AIzaSyB3bDebZmDc4DQ0_M03XB14ZA7QnSaIgCM&q="+address.city+","+address.street;
  }

}
