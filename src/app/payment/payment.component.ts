import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GooglePayButtonComponent,GooglePayButtonModule } from '@google-pay/button-angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  gstinNumber: string = '';
  email: string = '';
  totalGST: number | undefined;
  paymentRequest!: google.payments.api.PaymentDataRequest;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.paymentRequest = {

      apiVersion:2,
      apiVersionMinor:0,
      allowedPaymentMethods:[
        {
          type:'CARD',
          parameters:{
            allowedAuthMethods:['PAN_ONLY','CRYPTOGRAM_3DS'],
            allowedCardNetworks:['MASTERCARD','VISA'],
          },
          tokenizationSpecification:{
            type:'PAYMENT_GATEWAY',
            parameters:{
              gateway:'example',
              gatewayMerchantId:'exampleGatewayMerchantId',
            },
          },
        },
      ],
      merchantInfo:{
        merchantId:'17613812255336763067',
        merchantName: 'Demo only(you will not be charged)',
      },
      transactionInfo:{
        totalPriceStatus:'FINAL',
        totalPriceLabel:'Total',
        totalPrice:'500',
        currencyCode:'USD',
        countryCode:'US',
      },
    };
    }
  calculateTotalGST(): void {
    this.http.post<any>('http://localhost:8090/api/calculate-gst', { gstin: this.gstinNumber, email: this.email })
      .subscribe(
        (data) => {
          this.totalGST = data.totalGST;
          console.log('Total GST:', this.totalGST); // Add this line to verify the data
        },
        (error) => {
          console.error('Error calculating total GST:', error);
        }
      );
  }
  async onLoadPaymentData(event: Event){
    const paymentData = (event as CustomEvent<google.payments.api.PaymentData>).detail;
  }
}
