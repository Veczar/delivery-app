import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../products/shopping-cart/shopping-cart.service';
import { AddressDto, PartnerDto, ProductDto, UserDto } from 'src/app/shared/model/api-models';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit {

  products: {product: ProductDto, quantity: number, subtotal: number }[] = [];

  checkoutForm!: FormGroup;
  submitted: boolean = false;
  partner!: PartnerDto | undefined;
  addresses!: AddressDto[] | undefined;
  customer!: UserDto;
  orderForm!: FormGroup;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
  ) {}


  ngOnInit(): void {
    this.products = this.shoppingCartService.getItems();
    this.partner = this.products[0].product.owner;

    this.initForm();
    this.userService.getUser(parseInt(localStorage.getItem('id') as string)).subscribe(user => {
      console.log(user);
      this.submitted = true;
      this.addresses = user.addresses;
      this.customer = user;
      // user.addresses?.forEach(address => {
      //   this.addAddress();
      // });

      this.checkoutForm.patchValue(user);
    })
  }

  getTotal(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  getQty() {
    return this.shoppingCartService.getQuantity()
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
    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      if (control) {
        control.setValue(control.value);
      }
    });

    if (this.checkoutForm.invalid) {
      console.log('wrong form')
      return;
    }
    // console.log(this.orderForm.value)
    // console.log(this.checkoutForm.value)
    // console.log(this.orderForm)
    
    const form = this.orderForm.value;

    const addrEndId = this.checkoutForm.value.addressEnd;
    form.addressEnd = {id: addrEndId};
    
    const addrStartId = this.partner?.owner.addresses[0].id;
    form.addressStart = {id: addrStartId};

    form.customer.id = this.customer.id;
    form.deliveryMan.id = 1; //TODO: change this
    form.tip = 0;
    form.totalPrice = this.shoppingCartService.getTotalPrice();

    const partnerId = this.partner?.id;
    form.partner = {id: partnerId};

    form.status = "inPreparation";
    form.creationDate = new Date();

    console.log(JSON.stringify(this.orderForm.value, null, 2));

    this.orderService.makeOrder(this.orderForm.value).subscribe(r => {
      console.log(r)
    });


    
  }

}
