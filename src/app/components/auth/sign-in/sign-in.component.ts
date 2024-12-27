import { CommonModule, NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxBugatlasService } from 'ngx-bugatlas';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, HttpClientModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  protected loginForm!: FormGroup;
  protected isLoading = signal(false);
  protected roleValue: number = 0;
  protected showPassword: boolean = false;


  constructor(
    private readonly formBuilder: FormBuilder,
    // private readonly toastr: ToastrService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private bugatlasService: NgxBugatlasService
  ) { }

  ngOnInit(): void {
    this.initForm();
    initFlowbite();
    // localStorage.storeData('reset-password', 'false');
  }

  /**
   * Inits form
   */
  protected initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // role: ['', Validators.required] // commented for now will use/remove in future
    })
  }




  protected submitForm() {
    this.isLoading.set(true);

    if (!this.loginForm.valid) {
      this.isLoading.set(false);
      console.error("Invalid form data. Please check your inputs.");
      return; // Prevent further execution
    }

    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    // Proceed with API call
    this.authService.login(payload).subscribe({
      next: (response: any) => {
        this.isLoading.set(false);
        alert('Login Successful');
      },
      error: () => {
        // Error handling is delegated to the interceptor
        this.isLoading.set(false);
      },
    });
  }

  // commented for now will use/remove in future
  /**
   * Sets the role value and updates the form
   * @param event Event that triggered the method
   */
  // protected getRoleValue(event: any): void {
  //   // Get the value of the selected role
  //   this.roleValue = event.target.value;

  //   // Update the form with the selected role value
  //   this.loginForm.patchValue({role: Number(this.roleValue)})
  // }



  /**
   * Submits the login form
   */
  // protected submitForm() {
  //   this.isLoading.set(true);
  //   const payload = {
  //     email: this.loginForm.value.email,
  //     password: this.loginForm.value.password
  //   }
  //   this.authService.login(payload.email).subscribe({
  //     next: (response: any) => {

  //       this.isLoading.set(false);
  //       alert('Login Successful');
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log("erro")
  //       this.bugatlasService.appErrorPost(error).subscribe((res: any) => {
  //         console.log(res, "Error REsponse")
  //       })
  //     }
  //   });

  // }






  /**
   *
commented for now will use/remove in future
   * /
  // protected submitForm() {
  //   this.isLoading.set(true);

  //   const payload = {
  //     email: this.loginForm.value.email,
  //     password: this.loginForm.value.password,
  //   };

  //   // Fetch dynamic platform information
  //   const deviceInfo = {
  //     device_id: this.getDeviceId(), // Implement a method to fetch the device ID
  //     ip_address: "::1", // Replace with actual logic to fetch IP address if needed
  //     operating_system: platform.os?.family || "Unknown OS",
  //     os_version: platform.os?.version || "Unknown Version",
  //     browser: platform.name || "Unknown Browser",
  //     browser_version: platform.version || "Unknown Version",
  //   };

  //   if (!this.loginForm.valid) {
  //     this.isLoading.set(false);

  //     // Create client error payload
  //     const clientError = {
  //       ...deviceInfo,
  //       error_type: 0, // Client error
  //       error_message: "Invalid form data",
  //       tag: "Web app",
  //       meta: {
  //         data: "Form validation failed",
  //       },
  //     };

  //     this.bugatlasService.appErrorPost(clientError).subscribe({
  //       next: (res: any) => {
  //         console.log('Client error logged:', res);
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.error('Error logging client error:', err);
  //       },
  //     });

  //     return; // Prevent further execution
  //   }

  //   // Proceed with API call
  //   this.authService.login(payload).subscribe({
  //     next: (response: any) => {
  //       this.isLoading.set(false);
  //       alert('Login Successful');
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.isLoading.set(false);

  //       // Handle server-side error
  //       const apiError = {
  //         ...deviceInfo,
  //         error_type: 0, // API error
  //         error_message: error.message,
  //         tag: "Web app",
  //         meta: {
  //           status_code: error.status,
  //           page: window.location.href,
  //           short_error: error.error?.message,
  //         },
  //       };

  //       this.bugatlasService.httpErrorPost(apiError).subscribe({
  //         next: (res: any) => {
  //           console.log('API error logged:', res);
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           console.error('Error logging API error:', err);
  //         },
  //       });
  //     },
  //   });
  // }


  private getDeviceId(): string {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = uuidv4(); // Generate a new UUID
      localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  }


  /**
   * Handles the response from the brand account login
   * - Sets the loading state to false
   * - Shows a success message
   * - Stores the user details, user type, login response, auth token, session token, and email verified in local storage
   * - Navigates to the dashboard
   * @param response The response from the brand account login
   */
  // protected handleBrandAccountLogin(response: any) {
  //   this.isLoading.set(false);
  //   this.toastr.success(response.message);
  //   this.localStorageService.storeData('user_details', response);
  //   this.localStorageService.storeData('user_type', response.data.user_type);
  //   this.localStorageService.storeData('login-response', response.data._id);
  //   this.localStorageService.storeData('auth-token', response.data.authentication_token);
  //   this.localStorageService.storeData('session-token', response.data.session_token);
  //   this.localStorageService.storeData('email-verified', response.data.email_verified);
  //   this.router.navigate(['/dashboard']);
  // }


  /**
   * Handles an error response by displaying an error message and updating the loading state.
   * @param message The error message to display.
   */
  protected handleError(message: any) {
    this.bugatlasService.httpErrorPost(message)
    // Set loading state to false
    this.isLoading.set(false);

    // Display error message to the user
    // this.toastr.error(message);
  }

  /**
   * Toggles password visibility
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

