import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTestComponent } from './carousel-test.component';

describe('CarouselTestComponent', () => {
  let component: CarouselTestComponent;
  let fixture: ComponentFixture<CarouselTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselTestComponent]
    });
    fixture = TestBed.createComponent(CarouselTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
