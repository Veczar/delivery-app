import { BootstrapOptions, Component } from '@angular/core';
import { NgbModal, NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../modules/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../shared/toast/toast.service';
import { OrderDto, OrderReadDto, ProductOrderDto } from 'src/app/shared/model/api-models';
import { OrderService } from '../order.service';
import { OrderProductService } from 'src/app/modules/order-product/orderProduct.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent {
  orderProductList: ProductOrderDto[] = [];
  orders: OrderReadDto[] = [];
  
  constructor(
    public http: HttpClient,
    private orderService: OrderService,
    private orderProdutctService: OrderProductService,
    private toastService: ToastService
  ) {

  }
  ngOnInit(): void {
    const id: number = Number(localStorage.getItem('id'));
    this.orderService.getOrdersAssignedToUser(id).subscribe(orders => {
      this.orders = orders;
    })
    this.orderProdutctService.getOrdersProductsAssignedToUser(id).subscribe(orderProductList =>
      {
          this.orderProductList = orderProductList;
      });
  }
  setRating(order: OrderReadDto, rating?: number) : void{
    this.orderService.setRating(order.id, rating).subscribe(a =>
      {
          this.toastService.showSuccess("Rating was set")
      });;
      order.rating = rating;

  }
  getProductsList(id?: number) : ProductOrderDto[]
  {
    return this.orderProductList.filter((productOrderDto : ProductOrderDto) => {
        return productOrderDto.order?.id === id;
      });
      
  }
}
