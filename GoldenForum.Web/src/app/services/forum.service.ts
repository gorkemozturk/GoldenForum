import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.url + '/forums', http);
  }
}
