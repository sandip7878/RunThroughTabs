import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DistancesPage } from './distances.page';

describe('DistancesPage', () => {
  let component: DistancesPage;
  let fixture: ComponentFixture<DistancesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DistancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
