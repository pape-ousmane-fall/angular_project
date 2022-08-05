import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
productId!:string;
product!:Product;
productFormgroup!:FormGroup;
  constructor(private route:ActivatedRoute,
    private fb:FormBuilder,
    public productService:ProductService) { 
    this.productId = this.route.snapshot.params['id'];


  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe({
      next:(product:Product) => {
        this.product=product;
        this.productFormgroup=this.fb.group({
          name:this.fb.control(this.product.name,[Validators.required,Validators.minLength(5)]),
      price:this.fb.control(this.product.price,[Validators.required,Validators.min(100)]),
      promotion:this.fb.control(this.product.promotion),
        })
      }
    })
  }


  handleUpdateSubmit(){
     let product = this.productFormgroup.value;
     product.id=this.productId;
     this.productService.updateProduct(product).subscribe({
      next:(product:Product) => {
        alert("Product update successfully");
        this.productFormgroup.reset();
      },
      error:(error) => {
        console.log(error)
      }
     })
  }

}
