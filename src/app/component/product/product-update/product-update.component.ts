import { Component, OnInit } from '@angular/core';
import {ProductModel} from '../product.model';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

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

  atualizarProduto(): void {
    this.productService.update(this.product).subscribe(() => {
    this.productService.showMessage('Produto Atualizado');
    this.router.navigate(['/products']);
    });
  }

}
