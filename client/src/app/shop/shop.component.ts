import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/products';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static: false}) seachTerm : ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[]; 
  //shopParams = new ShopParams();
  shopParams: ShopParams;
  totalCount : number;
  sortOptions = [
    {name: 'Alphabetical', value : 'name'},
    {name: 'Price: Low to High', value : 'priceAsc'},
    {name: 'Price: High to Low', value : 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { 
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit() {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response.data;
      //this.shopParams.pageNumber = response.pageIndex;
      //this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count; 
    }, error => {
        console.log(error); 
    });
  }
  
  getBrands(){
    this.shopService.getBrands().subscribe(response =>{
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error =>{
      console.log(error); 
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response =>{
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error =>{
      console.log(error);
    });
  }

  onBrandSelected(brandId: number){
    const params = this.shopService.getShopParams();
    //this.shopParams.brandId = brandId;
    //this.shopParams.pageNumber = 1;
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    //this.shopParams.typeId = typeId;
    //this.shopParams.pageNumber = 1;
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts()
  }

  onSortSelected(sort: string){
    const params = this.shopService.getShopParams();
    //this.shopParams.sort = sort;
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event : any){
    const params = this.shopService.getShopParams();
    // if(this.shopParams.pageNumber !== event){
    //   this.shopParams.pageNumber = event
    if(params.pageNumber !== event){
      params.pageNumber = event
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    // this.shopParams.search = this.seachTerm.nativeElement.value;
    // //console.log(this.shopParams.search);
    // this.shopParams.pageNumber = 1;
    
    params.search = this.seachTerm.nativeElement.value;
    //console.log(this.shopParams.search);
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset(){
    this.seachTerm.nativeElement.value = '';
    // this.shopParams = new ShopParams();
    //const params = new ShopParams();
    // this.shopService.setShopParams(params);
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
