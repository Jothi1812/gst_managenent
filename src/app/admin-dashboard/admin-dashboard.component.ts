import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from '../carts.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  carts: any[] = [];

  constructor(private router: Router, private cartsService: CartsService) { }

  ngOnInit(): void {
    this.fetchCarts();
  }

  fetchCarts(): void {
    this.cartsService.getCarts()
      .subscribe(
        (data) => {
          this.carts = data;
          console.log('Fetched carts:', this.carts);
        },
        (error) => {
          console.error('Error fetching carts:', error);
        }
      );
  }

  navigateToPayment(): void {
    this.router.navigateByUrl('/payment');
  }
}
