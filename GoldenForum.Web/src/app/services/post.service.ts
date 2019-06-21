import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService {
  
  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.url + '/posts', http);
  }

  putPostVariety(entry: any): Observable<any> {
    return this.httpClient.put<any>(environment.url + '/posts/' + entry.id + '/variety', entry);
  }
}