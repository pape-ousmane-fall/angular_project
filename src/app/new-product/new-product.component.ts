import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
productFormgroup!:FormGroup;
  constructor(private fb:FormBuilder,public productService: ProductService) {
    this.productFormgroup=this.fb.group({
      
      name:this.fb.control(null,[Validators.required,Validators.minLength(5)]),
      price:this.fb.control(null,[Validators.required,Validators.min(100)]),
      promotion:this.fb.control(false),
    })
  }

  ngOnInit(): void {
  }

  handleSubmit(){
let product = this.productFormgroup.value;
this.productService.addNewProduct(product).subscribe({
  next: (data:any) => {
    alert("Product added successfully");
    this.productFormgroup.reset();
  },
  error:err  => {
console.log(err)
  }
},
)

}


}
