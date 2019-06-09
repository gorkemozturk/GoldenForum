import { Component, OnInit, Input } from '@angular/core';
import { Reply } from 'src/app/models/reply';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reply-entry',
  templateUrl: './reply-entry.component.html',
  styleUrls: ['./reply-entry.component.css']
})
export class ReplyEntryComponent implements OnInit {
  @Input() reply: Reply = new Reply();
  @Input() i: number = null;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
