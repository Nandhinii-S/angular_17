import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxBugatlasService } from 'ngx-bugatlas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trace-new';

  protected bugatlasService = inject(NgxBugatlasService)
  constructor() {
    const data = {
      api_key: 'OLT2K164Z4PU2EKQ',
      secret_key: 'PQT7XE82FF9DZBNN',
    };
    this.bugatlasService.seConfigKey(data);
  }
}
