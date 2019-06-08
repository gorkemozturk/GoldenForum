import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {
  @Input() rating: number;
  blocks: boolean[] = [];

  constructor() { }

  ngOnChanges() {
    let i = 1;
    while (i <= this.rating) {
      this.blocks.push(true);
      i++;
    }
  }

}
