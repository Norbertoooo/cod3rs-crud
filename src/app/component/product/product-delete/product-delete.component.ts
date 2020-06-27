import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: ProductModel;
  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }
  cancel(): void{
    this.router.navigate(['/products']);
  }

  deletarProduto(): void {
    this.productService.delete(this.product.id.toString()).subscribe(() => {
      this.productService.showMessage('Produto excluido');
      this.router.navigate(['/products']);
    });
  }


}
