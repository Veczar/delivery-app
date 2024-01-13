import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/navbar/shopping-cart/shopping-cart.service';
import { AddressDto, Frequency, OrderDto, PartnerDto, ProductDto, ProductOrderDto, RecurringOrderDto, Status, UserDto } from 'src/app/shared/model/api-models';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { OrderService } from '../order.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Router } from '@angular/router';
import { ProductOrderService } from '../../product-order/product-order.service';
import { DatePipe } from '@angular/common';
import { RecurringOrdersService } from '../../reccuring-orders/recurring-orders.service';
import {} from 'googlemaps'; 

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit, AfterViewInit {

  products: {product: ProductDto, quantity: number, subtotal: number }[] = [];

  checkoutForm!: FormGroup;
  orderForm!: FormGroup;
  recurringForm!: FormGroup;
  submitted: boolean = false;
  submitted2: boolean = false;
  recurring: boolean = false;
  partner!: PartnerDto | undefined;
  addresses!: AddressDto[] | undefined;
  customer!: UserDto;
  tip!: number;
  deliveryFee: number = 0;
  totalPrice!: number;
  startDate: any;
  frequencies: string[] = [];
  selctedFreq!: string;
  distance : number = 0;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productOrderService: ProductOrderService,
    private recurringOrdersService: RecurringOrdersService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
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
    this.initForm();

    this.products = this.shoppingCartService.getItems();
    this.partner = this.products[0].product.owner;

    this.userService.getUser(parseInt(localStorage.getItem('id') as string)).subscribe(user => {
      console.log(user);
      this.submitted = true;
      this.addresses = user.addresses;
      this.customer = user;

      this.checkoutForm.patchValue(user);
    })


    this.frequencies = Object.values(Frequency);
  }

  ngAfterViewInit(): void {
    this.totalPrice = this.shoppingCartService.getTotalPrice() + this.deliveryFee;
    this.cd.detectChanges() //to resolve NG0100 error
  }

  getTotal(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  getQty() {
    return this.shoppingCartService.getCartSize()
  }

  getDistance(origin: string, destination: string) {
    const matrix = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject)=>{
      matrix.getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
      },
      function(response : google.maps.DistanceMatrixResponse, status) {
        if (status === 'OK'){
          console.log("Async Work Complete");          
          resolve(response)
        } else {

          console.log("Async Work reject");
          console.log(response);
          reject(response);
        }
      });
    });
  }

  onChangeAdrees(addressDto :AddressDto)
  {
    const origins = this.partner?.owner.addresses[0].city +","+ this.partner?.owner.addresses[0].street;
    const destination = addressDto.city +","+ addressDto.street;
    this.getDistance(origins, destination).then(
      (response) => {
        var distanceMatrixResponse = response as google.maps.DistanceMatrixResponse;
        var dist = distanceMatrixResponse.rows[0].elements[0].distance.value;
        this.deliveryFee = Math.ceil((dist * 0.0002)*100)/100;
        this.totalPrice = this.shoppingCartService.getTotalPrice() + this.deliveryFee
        this.distance = dist/1000;
        this.cd.detectChanges();
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
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
    });

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
      tip: ["", Validators.min(0)],
      totalPrice: [null, Validators.required],
      status: [null, Validators.required],
      creationDate: [null, Validators.required],
    });

    this.recurringForm = this.formBuilder.group({
      addressStart: this.formBuilder.group({
        id: [null, Validators.required],
      }),       
      addressEnd: this.formBuilder.group({
        id: [null, Validators.required],
      }),      
      quantity: [ null, Validators.required],
      frequency: [ null, Validators.required],
      startDate: [ null, Validators.required],
      customer: this.formBuilder.group({
        id: [null, Validators.required],
      }),      
      product: this.formBuilder.group({
        id: [null, Validators.required],
      }),    
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.checkoutForm.controls;
  }

  get f2(): { [key: string]: AbstractControl } {
    return this.recurringForm.controls;
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
    form.tip = this.tip > 0 ? this.tip : 0;
    form.totalPrice = this.totalPrice;

    const partnerId = this.partner?.id;
    form.partner = {id: partnerId};

    form.status = Status.inPreparation;
    form.creationDate = new Date();

    // console.log(JSON.stringify(this.orderForm.value, null, 2));
    var tmp  = this.orderForm.value as OrderDto;
    tmp.totalPrice = this.totalPrice;
    tmp.distanceInKm = this.distance;
    this.makeOrder(tmp);
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

  onSubmitRecurring() {
    this.recurringForm.markAllAsTouched();
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
    const form = this.recurringForm.value;
    
    const startDate = new Date(this.recurringForm.value.startDate).setHours(12, 0, 0, 0);
    const formattedDate = this.datePipe.transform(startDate, 'yyyy-MM-ddTHH:mm');
    form.startDate = formattedDate;

    form.addressEnd.id = Number(this.checkoutForm.value.addressEnd);
    form.addressStart.id = this.partner?.owner.addresses[0].id;

    form.quantity = this.products[0].quantity;
    form.customer.id = this.customer.id;
    form.product.id = this.products[0].product.id;

    // console.log(this.recurringForm.value)
    console.log(JSON.stringify(form, null, 2));
    this.recurringOrdersService.makeRecurringOrder(form).subscribe(response => {
      console.log('success')
    });
    this.router.navigate(['/']);
    this.toastService.showSuccess('Periodic order has been set')
    this.shoppingCartService.clear();
  }

}
