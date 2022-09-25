import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  alertMassage:boolean = false;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptyCart(){
    this.cartService.removeAllCart();
  }
  // Total Price after change input.
  changeTotal(event: any) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    var title = input.parentElement.previousSibling.previousSibling.previousSibling.firstChild.innerText;
    var priceElement = input.parentElement.previousSibling.innerText;
    var price = parseFloat(priceElement.replace("$", ""));
    var total = 0;
    total = total + price * input.value;
    // if price contain some cents value
    total = Math.round(total * 100) / 100;
    // return Subtotal in HTML
    input.parentElement.nextSibling.innerText = total;
    var prod = this.cartService.cartItemList.find((item: any) => item.title === title);
    prod.total = total;
    console.log(prod)
    this.grandTotal = 0;
    this.cartService.cartItemList.map((a:any)=>{
      this.grandTotal += (a.total);
    })
    return this.grandTotal;
  }
  checkout() {
    this.alertMassage = true;
    this.emptyCart()
    setTimeout(() => {
    this.alertMassage = false;
    }, 2000);
  }
  heads: any[] = [
    {
      id: '',
    },
    {
      title: 'Product',
    },
    {
      title: 'Image',
    },
    {
      title: 'Price',
    },
    {
      title: 'Quantity',
    },
    {
      title: 'Total',
    },
    {
      title: 'Remove',
    },
  ]
}
