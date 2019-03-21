import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment.prod';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  User(): Observable<any> {
    return this.httpClient
      .get('/user') // Base URL for API is set in the httpClient 
      .pipe(
        map((body: any) => body.value),
        catchError(() => of('Error, loading User API'))
      );
  }
  getdata(ou:string, product:string, tableName:string): Observable<any> {
    return this.httpClient
      .get(`/${ou}/${product}/data/${tableName}`); // Base URL for API is set in the httpClient 
  }
  getbyentity(ou:string, product:string, tableName:string, entityId:string): Observable<any> {
    return this.httpClient
      .get(`/${ou}/${product}/data/${tableName}/entityId/${entityId}`); // Base URL for API is set in the httpClient 
  }
}
