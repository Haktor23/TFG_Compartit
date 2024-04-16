import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreareventoComponent } from './crearevento.component';

describe('CreareventoComponent', () => {
  let component: CreareventoComponent;
  let fixture: ComponentFixture<CreareventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreareventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreareventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
