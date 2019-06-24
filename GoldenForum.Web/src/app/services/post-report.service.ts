import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PostReportService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.url + '/postreports', http);
  }
}
