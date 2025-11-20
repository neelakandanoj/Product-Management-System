import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product';
import { ProductService } from '../Service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  newProduct: Product = {
    name: '',
    brand: '',
    category: '',
    price:0,
    description: '',
   
  };

  editedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  addProduct() {
    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = { name: '', brand: '', category: '', price: 0, description: '' };
      },
      error: (err) => console.error('Error creating product:', err)
    });
  }

  editProduct(product: Product) {
    this.editedProduct = { ...product };
  }

  updateProduct() {
    if (!this.editedProduct) return;

    this.productService.updateProduct(this.editedProduct.id!, this.editedProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.editedProduct = null;
      },
      error: (err) => console.error('Error updating product:', err)
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Error deleting product:', err)
    });
  }
}
