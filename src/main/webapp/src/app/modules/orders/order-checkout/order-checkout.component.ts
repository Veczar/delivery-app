import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../products/shopping-cart/shopping-cart.service';
import { AddressDto, OrderDto, PartnerDto, ProductDto, ProductOrderDto, Status, UserDto } from 'src/app/shared/model/api-models';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { OrderService } from '../order.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Router } from '@angular/router';
import { ProductOrderService } from '../../product-order/product-order.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit, AfterViewInit {

  products: {product: ProductDto, quantity: number, subtotal: number }[] = [];

  checkoutForm!: FormGroup;
  submitted: boolean = false;
  submitted2: boolean = false;
  recurring: boolean = false;
  partner!: PartnerDto | undefined;
  addresses!: AddressDto[] | undefined;
  customer!: UserDto;
  orderForm!: FormGroup;
  tip!: number;
  totalPrice!: number; // sum of subtotals and tip and delivery fee
  startDate: any;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
    private productOrderService: ProductOrderService,
    private toastService: ToastService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {}


  ngOnInit(): void {
    if (this.router.url === '/checkout/recurring') {
      console.log(this.router.url)
      this.recurring = true;
    }

    this.products = this.shoppingCartService.getItems();
    this.partner = this.products[0].product.owner;

    this.initForm();
    this.userService.getUser(parseInt(localStorage.getItem('id') as string)).subscribe(user => {
      console.log(user);
      this.submitted = true;
      this.addresses = user.addresses;
      this.customer = user;

      this.checkoutForm.patchValue(user);
    })
  }

  ngAfterViewInit(): void {
    this.totalPrice = this.shoppingCartService.getTotalPrice() + 2.50; //+ delivery fee
    this.cd.detectChanges() //to resolve NG0100 error
  }

  getTotal(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  getQty() {
    return this.shoppingCartService.getCartSize()
  }

  initForm(): void {
    this.checkoutForm = this.formBuilder.group({
      id: [''],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)
        ]
      ],
      telephoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(11),
          Validators.pattern(/^[0-9]+(?:[ -][0-9]+)*$/),
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(30),
        ]
      ],
      addressEnd: [ null, Validators.required],
    })

    this.orderForm = this.formBuilder.group({
      addressStart: [null, Validators.required],
      addressEnd: [ null, Validators.required],
      customer: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      partner: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      deliveryMan: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      tip: [null, Validators.required],
      totalPrice: [null, Validators.required],
      status: [null, Validators.required],
      creationDate: [null, Validators.required],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    this.submitted2 = true;
    console.log(this.checkoutForm.value)

    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.checkoutForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

    if (this.checkoutForm.invalid) {
      console.log(this.checkoutForm.value)
      console.log('wrong form');
      return;
    }
    // console.log(this.orderForm.value)
    // console.log(this.checkoutForm.value)
    
    const form = this.orderForm.value;

    const addrEndId = this.checkoutForm.value.addressEnd;
    form.addressEnd = {id: addrEndId};
    
    const addrStartId = this.partner?.owner.addresses[0].id;
    form.addressStart = {id: addrStartId};

    form.customer.id = this.customer.id;
    form.deliveryMan = null;
    form.tip = this.tip;
    form.totalPrice = this.totalPrice; //TODO: calculate this maybe

    const partnerId = this.partner?.id;
    form.partner = {id: partnerId};

    form.status = Status.inPreparation;
    form.creationDate = new Date();

    // console.log(JSON.stringify(this.orderForm.value, null, 2));

    this.makeOrder(this.orderForm.value);
    this.router.navigate(['/']);
    this.toastService.showSuccess('Order completed, now wait for delivery')
    this.shoppingCartService.clear();
  }

  makeOrder(order: OrderDto) {
    this.orderService.makeOrder(order).subscribe(order => {
      console.log(order);

      this.products.forEach((product) => {
        const productOrder: ProductOrderDto = {
          product: product.product,
          order: order,
          quantity: product.quantity,
          subtotal: product.subtotal
        }
        this.productOrderService.makeProductOrder(productOrder).subscribe(r => {
          console.log(r)
        });
      });
    });
  }

  onRecurring() {
    this.startDate = new Date(this.startDate)
    const formattedDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd HH:mm');

    console.log(formattedDate);
  }
}
