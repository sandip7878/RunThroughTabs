import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private loadingController: LoadingController,
    public sanitizer: DomSanitizer,
  ) { }

  async showLoader() {
    const loader = await this.loadingController.create({
      // message: 'Please wait...',
      spinner: 'dots',
      duration: 1500, // 3 seconds
      backdropDismiss: false
    });
  
    await loader.present();
  }

  sanitizedUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
