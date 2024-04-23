import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAnimalesComponent } from './info-animales.component';

describe('InfoAnimalesComponent', () => {
  let component: InfoAnimalesComponent;
  let fixture: ComponentFixture<InfoAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoAnimalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
