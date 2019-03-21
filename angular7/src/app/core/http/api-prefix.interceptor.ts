import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        url: environment.serverUrl + request.url,
        headers: new HttpHeaders({
          'ocp-apim-subscription-key': environment.apiKey,
          'wellview': 'dwB2AHwAMQAwAC4AMAAwAHwAMQAwAC4AMwAwAHwAaQBkAHcAZQBsAGwAfAB3AHYAdwBlAGwAbABoAGUAYQBkAGUAcgB8ADQANAA3ADgARAAwAEQARABBADMAQwBBADQAQgAzADUAQgBBADUARgBFADUAQwAxADgAQQA3ADAANQBFADEAOQB8AFcAZQBsAGwAVgBpAGUAdwB8AHcAdgB8ADEAMAAuADMAMAB8AEEAbABsACAARABhAHQAYQA=',
          'Authorization': 'Bearer ' + environment.accessToken
          })
      });      
    }
    return next.handle(request);
  }
}