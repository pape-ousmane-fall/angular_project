import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageProduct, Product } from '../model/product.model';
import { AuthentificationService } from '../services/authentification.service';
import { ProductService } from '../services/product.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // products:Array<any> | undefined;
  products!:Array<Product>;
  currentPage:number=0;
  pageSize:number =5;
  totalPages:number =0;
  errorMessage!:string;
  searchFormGroup!:FormGroup;
  currentAction:string="all";

  constructor(private productService: ProductService,
    private fb: FormBuilder,
    public authenticateService:AuthentificationService,
              private  router:Router
    ) {

  }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control(null),

    })
this.handlePageProduct()
  }

  handleGetallProduct(){
    this.productService.getAllProducts().subscribe(
      {
        next:(data:Product[]) => {
          this.products = data;
        },
        error:(err:any) => {
            this.errorMessage=err;
        }
      }
     )
  }


  gotoPage(i:number){
    this.currentPage=i;
    if(this.currentAction==="all")
    this.handlePageProduct()
    else
    this.handleSearchProducts()
  }

  handlePageProduct(){
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe(
      {
        next:(data:PageProduct) => {
          this.products = data.products;
          this.totalPages=data.totalPages;
        },
        error:(err:any) => {
            this.errorMessage=err;
        }
      }
     )
  }
  handleDeleteProduct(p:Product) {
    let conf=confirm("Are you sure you want to delete");
    if(conf==false) return ;//je sort de cette methode
    this.productService.deleteProduct(p.id).subscribe({
      next:(data:boolean) => {
        let index=this.products.indexOf(p);
        this.products.splice(index, 1);
        // this.handleGetallProduct()
      }
    })
  }
  handleSetPromotion(p:Product) {
    let promo=p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next:(data:boolean) => {
        p.promotion=!promo;
        // this.handleGetallProduct()
      },
      error:(err) => {
        this.errorMessage=err;
      }
    })
  }
  handleSearchProducts(){
    this.currentAction="search";
      let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next:(data:PageProduct) => {
         console.log({data})
        this.products= data.products;
        this.totalPages=data.totalPages;
      }
    })
  }

  handleNewProduct() {
  this.router.navigateByUrl("admin/newProduct");
  }
  handleEditProduct(product:Product){
    console.log(product);
    this.router.navigateByUrl("admin/editProduct/"+product.id);

  }
}
