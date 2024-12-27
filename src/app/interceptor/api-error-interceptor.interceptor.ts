import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxBugatlasService } from 'ngx-bugatlas';
import platform from 'platform';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private bugatlasService: NgxBugatlasService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const deviceInfo = {
          device_id: this.getDeviceId(), // Replace with your logic
          ip_address: "::1", // Replace with actual IP logic
          operating_system: platform.os?.family || "Unknown OS",
          os_version: platform.os?.version || "Unknown Version",
          browser: platform.name || "Unknown Browser",
          browser_version: platform.version || "Unknown Version",
        };

        if (error.error instanceof ErrorEvent) {
          // Client-side or network error
          const clientErrorPayload = {
            ...deviceInfo,
            error_type: 0, // Client error type
            error_message: error.error.message,
            tag: "Web app",
            meta: {
              data: "Client-side error or network issue",
            },
          };

          // Log client-side error to BugAtlas
          this.bugatlasService.appErrorPost(clientErrorPayload).subscribe({
            next: () => console.log('Client-side error logged to BugAtlas'),
            error: (logError: HttpErrorResponse) => console.error('Error logging to BugAtlas:', logError),
          });

          console.error('A network error occurred. Please check your connection.');
        } else {
          // Server-side error
          const apiErrorPayload = {
            ...deviceInfo,
            error_type: 1, // API error type
            error_message: error.message,
            tag: "Web app",
            meta: {
              status_code: error.status,
              page: window.location.href,
              short_error: error.error?.message || "No message available",
            },
          };

          // Log server-side error to BugAtlas
          this.bugatlasService.httpErrorPost(apiErrorPayload).subscribe({
            next: () => console.log('Server-side error logged to BugAtlas'),
            error: (logError: HttpErrorResponse) => console.error('Error logging to BugAtlas:', logError),
          });

          console.error('An error occurred while processing your request.');
        }

        return throwError(() => error);
      })
    );
  }

  private getDeviceId(): string {
    // Implement your logic to fetch the device ID
    return 'mock-device-id';
  }
}
