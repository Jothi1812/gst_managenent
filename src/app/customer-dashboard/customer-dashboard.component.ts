import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  customerDetailsSubmitted: boolean = false;
  customerDetails: any = {
    gstin: '',
    username:'',
    email:'',
    contactNumber:'',
    gsttype:'',
    productName:'',
    productPrice:''
  };
  newProduct: any = { name: '', price: null };
  addedProducts: any[] = [];

  constructor(private http: HttpClient) {}

  addProduct(form: any) {
    if (form.valid && this.newProduct.price > 0) {
      this.addedProducts.push({ name: this.newProduct.name, price: this.newProduct.price });
      this.newProduct.name = '';
      this.newProduct.price = null;
    }
  }

  calculateTotalPrice(): number {
    let total = 0;
    for (const product of this.addedProducts) {
      total += product.price;
    }
    return total;
  }

  calculateGST(): number {
    const total = this.calculateTotalPrice();
    return total * 0.1; // Assuming GST rate is 10%
  }

  deleteProduct(index: number): void {
    this.addedProducts.splice(index, 1);
  }

  submitCart() {
    const gstin = this.customerDetails.gstin;
    const username=this.customerDetails.username;
    const email=this.customerDetails.email;
    const contactNumber=this.customerDetails.contactNumber;
    const gstType=this.customerDetails.gstType;
    const productName=this.customerDetails.productName;
    const productPrice=this.customerDetails.productPrice

    const totalPrice = this.calculateTotalPrice();
    const gst = this.calculateGST();
    

    this.http.post('http://localhost:4000/submit-cart', { gstin,username,email,contactNumber,gstType,productName,productPrice,totalPrice, gst })
      .subscribe((response: any) => {
        console.log('Cart submitted successfully:', response);
        // Clear the added products list
        this.addedProducts = [];
      }, (error: any) => {
        console.error('Error submitting cart:', error);
      });
  }

  submitCustomerDetails(form: any) {
    if (form.valid) {
      this.customerDetailsSubmitted = true;
    }
  }
}
