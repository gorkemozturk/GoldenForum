import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private url: string, private http: HttpClient) { }

  getResources(): Observable<any> {
    return this.http.get<any>(this.url, httpOptions).pipe(map(result => result));
  }

  getResource(id: any): Observable<any> {
    return this.http.get<any>(this.url + '/' + id, httpOptions).pipe(take(1), map(result => result));
  }

  postResource(resource: any): Observable<any> {
    return this.http.post<any>(this.url, resource, httpOptions);
  }
  
  putResource(id: number, resource: any): Observable<any> {
    return this.http.put<any>(this.url + '/' + id, resource, httpOptions);
  }

  deleteResource(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id, httpOptions);
  }
}
