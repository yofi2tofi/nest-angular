import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';

import { MaterialModule } from '../material/material.module';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/guard.service';
import { IntercepterService } from './services/interceptor.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MaterialModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    IntercepterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    },
  ]
})
export class AuthModule { }
