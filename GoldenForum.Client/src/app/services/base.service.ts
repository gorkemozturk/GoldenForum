import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  
  constructor(private url: string, private http: HttpClient) { }

  getResources(): Observable<any> {
    return this.http.get<any>(this.url).pipe(map(result => result));
  }

  getResource(id: any): Observable<any> {
    return this.http.get<any>(this.url + '/' + id).pipe(take(1), map(result => result));
  }

  postResource(resource: any): Observable<any> {
    return this.http.post<any>(this.url, resource);
  }
  
  putResource(id: number, resource: any): Observable<any> {
    return this.http.put<any>(this.url + '/' + id, resource);
  }

  deleteResource(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
