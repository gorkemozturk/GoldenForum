import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AcclaimService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.url + '/acclaims', http);
  }
}
