import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: false
})
export class EventsPage implements OnInit {

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.showLoader();
  }

}
