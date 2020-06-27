import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductModel} from './product.model';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:8080/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(produto: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.baseUrl, produto).pipe(
      map( (obj) => obj ),
      catchError( (e) => this.errorHandler(e))
    );
  }

  read(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl).pipe(
      map( (obj) => obj ),
      catchError( (e) => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<ProductModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ProductModel>(url).pipe(
      map( (obj) => obj ),
      catchError( (e) => this.errorHandler(e))
    );
  }

  update(product: ProductModel): Observable<ProductModel> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<ProductModel>(url, product).pipe(
      map( (obj) => obj ),
      catchError( (e) => this.errorHandler(e))
    );
  }

  delete(id: string): Observable<ProductModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ProductModel>(url).pipe(
      map( (obj) => obj ),
      catchError( (e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
