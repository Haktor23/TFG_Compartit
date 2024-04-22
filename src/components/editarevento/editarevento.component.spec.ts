import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditareventoComponent } from './editarevento.component';

describe('EditareventoComponent', () => {
  let component: EditareventoComponent;
  let fixture: ComponentFixture<EditareventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditareventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditareventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
