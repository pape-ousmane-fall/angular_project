import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products :Array<Product> = [];

  constructor() { 
    this.products  = [
      {id:UUID.UUID(), name: 'Computer',price:650,promotion:true},
      {id:UUID.UUID(), name: 'Printer',price:1200,promotion:false},
      {id:UUID.UUID(), name: 'Computer',price:650,promotion:false},
      {id:UUID.UUID(), name: 'Smart phone',price:500,promotion:true},
    ];

    for (let i = 0; i <10;i++){
      this.products.push({id:UUID.UUID(), name: 'Computer',price:650,promotion:true},
      );
      this.products.push({id:UUID.UUID(), name: 'Printer',price:1200,promotion:false},
      );
      this.products.push({id:UUID.UUID(), name: 'Computer',price:650,promotion:false},
      );
      this.products.push({id:UUID.UUID(), name: 'Smart phone',price:500,promotion:true},
      );

    }
  }

 public getAllProducts():Observable<Array<Product>>{
  
   return of([...this.products]);
  }

 public getPageProducts( page:number,size:number):Observable<PageProduct>{
    let index =page*size;
  let totalPages=  ~~(this.products.length / size);//~~division entier
    if(this.products.length % size !=0){
        totalPages++;
    }
let pageProduct=    this.products.slice(index, index + size);//slice donne une partie du tableau
  
return of({
  page: page,
  size:size,
  totalPages:totalPages,
  products:pageProduct
})
  }


  deleteProduct( id: string):Observable<boolean> {
    this.products=  this.products.filter(product=>product.id!=id);
  return of(true);

  }
  setPromotion( id: string):Observable<boolean> {
  let product=  this.products.find(product => product.id==id);
  if (product != undefined) {
    product.promotion=!product.promotion;

      return of(true);

  }else {
  return  throwError(()=> new Error("Product  not found"));

  }

  }

  searchProducts( keyword: string,page: number,size: number):Observable<PageProduct>{
    let result= this.products.filter(product => product.name.includes(keyword));
   
    let index =page*size;
    let totalPages=  ~~(result.length / size);//~~division entier
      if(this.products.length % size !=0)
          totalPages++;
      
  let pageProduct= result.slice(index, index + size);//slice donne une partie du tableau
    
return of({
  page: page,
  size:size,
  totalPages:totalPages,
  products:pageProduct
});
  }
}
