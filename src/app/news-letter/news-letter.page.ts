import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { GlobalService } from '../services/global.service';
import { NewsletterInterface } from '../interfaces/newsletter.interface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.page.html',
  styleUrls: ['./news-letter.page.scss'],
  standalone: false,
})
export class NewsLetterPage implements OnInit {
  @ViewChild('newsletterForm') newsletterForms!: ElementRef<HTMLFormElement>;
  @Input() newsletterData!: NewsletterInterface;
  @Input() useDescriptionHtmlString = true;
  @Input() newsLetterPadding = '0 48px';
  @Input() useEmail: boolean = true;

  public _newsletter: NewsletterInterface = {};

  newsletterForm!: FormGroup;
  playVideo: boolean = false;
  isLoading: boolean = true;
  videoUrl: SafeResourceUrl | null = null;


  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private renderer: Renderer2,
    private modalCtrl: ModalController,
    private el: ElementRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initNewsletterForm();
    this.newsletter = {
      title: 'Join the RunThrough Newsletter',
      subTitle: 'Be a Part of the RunThrough community',
      description: '<p>Sign up below to receive the latest news, content and partner offers from RunThrough and make sure you never miss out on everything RunThrough!</p>',
    };
    // this.videoUrl = this.newsletterData?.video
    // ? this.sanitizer.bypassSecurityTrustResourceUrl(`${this.newsletterData.video}?&autoplay=1`)
    // : null;
  }

  ngAfterViewInit(): void {
    this.loadScript();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
  initNewsletterForm() {
    // this.newsletterForm = this.fb.group({
    //   email: ['', Validators.compose([Validators.required, Validators.email])],
    // });
  }

  private loadScript() {
    // Use querySelector to find the container where the script should be appended
    const container = this.el.nativeElement.querySelector(
      '.newsletter__code_wrapper'
    );

    if (container) {
      console.log('✅ Container found, appending script...');
      const script = this.renderer.createElement('script');
      script.src =
        'https://eocampaign.com/form/e749fd9e-f41f-11ec-9258-0241b9615763.js';
      script.async = true;
      script.setAttribute('data-form', 'e749fd9e-f41f-11ec-9258-0241b9615763');

      // Append the script to the container
      this.renderer.appendChild(container, script);

      script.onload = () => {
        this.moveFormToContainer();

        // Create a style element and add custom CSS for the success message
        const style = this.renderer.createElement('style');
        style.innerHTML = `
        .newsletter__code_wrapper [data-form="e749fd9e-f41f-11ec-9258-0241b9615763"] .emailoctopus-success-message  {
          color: white !important;
        }
          .newsletter__code_wrapper [data-form="e749fd9e-f41f-11ec-9258-0241b9615763"] .emailoctopus-error-message  {
          color: white !important;
        }
      `;

        // Append the style element to the document head
        this.renderer.appendChild(document.head, style);
      };
    } else {
      console.error('Container not found');
    }
  }

  private moveFormToContainer() {
    setTimeout(() => {
      const form = document.getElementById('emailoctopus-form');
      if (form) {
        const container = this.el.nativeElement.querySelector(
          '.newsletter__code_wrapper'
        );
        if (container) {
          container.appendChild(form);
          console.log('Form moved to container:', container);
          const successEl = form.querySelector('.emailoctopus-success-message');
          if (successEl) {
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((m) => {
                if (successEl.textContent?.trim()) {
                  console.log('✅ Subscription successful:', successEl.textContent.trim());
                  localStorage.setItem('newsletterSubscribed', 'true');

                }
              });
            });
  
            observer.observe(successEl, { childList: true, subtree: true });
          }
        } else {
          console.error('Container not found');
        }
      } else {
        console.error('Form not found');
      }
    }, 10000);
  }

  get newsletter() {
    return this._newsletter;
  }

  set newsletter(newsletterData: NewsletterInterface) {
    this._newsletter = {
      ...newsletterData,
      title: newsletterData?.title,
      description: newsletterData?.description,
    };
  }

  sanitizedUrl(url: string | undefined) {
    return this.globalService.sanitizedUrl(url ?? '');
  }

  submitButton(){
    console.log('submitButton: clicked', );
    const fname = (document.getElementById('mce-FNAME') as HTMLInputElement)?.value.trim();
        const lname = (document.getElementById('mce-LNAME') as HTMLInputElement)?.value.trim();
        const email = (document.getElementById('mce-EMAIL') as HTMLInputElement)?.value.trim();

        if (!fname || !lname || !this.validateEmail(email)) {
          console.warn('Invalid input detected');
        } else {
          console.log('✅ Valid input, proceeding');
          // Optionally set localStorage flag
          localStorage.setItem('newsletterSubscribed', 'true');
          setTimeout(() => {
            this.closeModal()
          }, 500);
        }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

}
