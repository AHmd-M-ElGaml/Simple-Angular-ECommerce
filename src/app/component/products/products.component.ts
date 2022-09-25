import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  alertMassage:boolean = false;
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  alertFalse() {
    if (this.alertMassage = true) {
      this.alertMassage = false
      return;
    }
  }
  addCart(item: any){
    for (let i = 0; i < this.cartService.cartItemList.length; i++) {
      if (item.title == this.cartService.cartItemList[i].title) {
        this.alertMassage = true;
        setTimeout(() => {
          this.alertMassage = false;
          }, 1500);
        return;
      }
  }
  this.cartService.addtoCart(item);
}
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category.name == category || category==''){
        return a;
      }
    })
  }

  // items: any[] = [
  //   {
  //     filter: "",
  //     img: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100',
  //     title: 'All products',
  //   },
  //   {
  //     filter: "Electronics",
  //     img: 'https://api.lorem.space/image/watch?w=640&h=480&r=5725',
  //     title: 'Watches',
  //   },
  //   {
  //     filter: "Clothes",
  //     img: 'https://api.lorem.space/image/fashion?w=640&h=480&r=8248',
  //     title: 'Clothes',
  //   },
  //   {
  //     filter: "Shoes",
  //     img: 'https://api.lorem.space/image/shoes?w=640&h=480&r=8530',
  //     title: 'Shoes',
  //   },
  //   {
  //     filter: "Furniture",
  //     img: 'https://api.lorem.space/image/furniture?w=640&h=480&r=9996',
  //     title: 'Furniture',
  //   },
  //   {
  //     filter: "Others",
  //     img: 'https://api.lorem.space/image?w=640&h=480&r=8262',
  //     title: 'Others',
  //   },
  // ]
}
