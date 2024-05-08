import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosRealizadosComponent } from './eventos-realizados.component';

describe('EventosRealizadosComponent', () => {
  let component: EventosRealizadosComponent;
  let fixture: ComponentFixture<EventosRealizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosRealizadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
