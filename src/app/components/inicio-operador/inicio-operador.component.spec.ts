import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioOperadorComponent } from './inicio-operador.component';

describe('InicioOperadorComponent', () => {
  let component: InicioOperadorComponent;
  let fixture: ComponentFixture<InicioOperadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioOperadorComponent]
    });
    fixture = TestBed.createComponent(InicioOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
