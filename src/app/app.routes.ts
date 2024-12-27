import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },

];
export const routing = RouterModule.forRoot(routes);