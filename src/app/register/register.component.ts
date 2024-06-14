import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  gstin: string = '';
  errorMessage: string = '';

  constructor(private registrationService: RegistrationService, private router: Router) { }

  onSubmit() {
    const userData = {
      email: this.email,
      password: this.password,
      gstin: this.gstin
    };

    this.registrationService.registerUser(userData).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']); // Redirect to login page
      },
      error => {
        console.error('Error registering user:', error);
        this.errorMessage = error.error.message; // Display error message
      }
    );
  }
}
