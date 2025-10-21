import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioMedicoComponent } from './inicio-medico.component';

describe('InicioMedicoComponent', () => {
  let component: InicioMedicoComponent;
  let fixture: ComponentFixture<InicioMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioMedicoComponent]
    });
    fixture = TestBed.createComponent(InicioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
