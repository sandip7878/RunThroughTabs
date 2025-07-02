import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-distances',
  templateUrl: './distances.page.html',
  styleUrls: ['./distances.page.scss'],
  standalone: false
})
export class DistancesPage implements OnInit {

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.showLoader();
  }

}
