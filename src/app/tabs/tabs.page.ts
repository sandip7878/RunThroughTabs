import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewsLetterPage } from '../news-letter/news-letter.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  constructor(private modalCtrl: ModalController) {}

  ionViewWillEnter(){
    const isSubscribed = localStorage.getItem('newsletterSubscribed') === 'true';
    if(!isSubscribed) this.showPopup();
  }
  
  async showPopup(){
    let modal = await this.modalCtrl.create({ 
      component: NewsLetterPage, 
      cssClass: "fullscreen" 
    });
    await modal.present();

  }

}
