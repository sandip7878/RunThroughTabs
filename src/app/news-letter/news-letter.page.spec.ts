import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsLetterPage } from './news-letter.page';

describe('NewsLetterPage', () => {
  let component: NewsLetterPage;
  let fixture: ComponentFixture<NewsLetterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLetterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
