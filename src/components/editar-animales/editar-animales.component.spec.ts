import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAnimalesComponent } from './editar-animales.component';

describe('EditarAnimalesComponent', () => {
  let component: EditarAnimalesComponent;
  let fixture: ComponentFixture<EditarAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAnimalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
