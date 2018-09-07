import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

import { MaterialModule } from '../material/material.module';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/guard.service';
import { IntercepterService } from './services/interceptor.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    HttpModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    // IntercepterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    },
  ]
})
export class AuthModule { }
