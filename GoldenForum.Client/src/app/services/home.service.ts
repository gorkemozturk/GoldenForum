import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {
  
  constructor(http: HttpClient) {
    super(environment.url + '/homes', http);
  }
}
