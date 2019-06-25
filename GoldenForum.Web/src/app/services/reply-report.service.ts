import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReplyReportService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.url + '/replyreports', http);
  }
}
