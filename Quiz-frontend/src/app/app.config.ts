import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; // File routes bạn đã sửa hết lỗi đỏ

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};