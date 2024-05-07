import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVehiculosComponent } from './info-vehiculos.component';

describe('InfoVehiculosComponent', () => {
  let component: InfoVehiculosComponent;
  let fixture: ComponentFixture<InfoVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoVehiculosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
