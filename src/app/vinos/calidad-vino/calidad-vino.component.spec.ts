import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadVinoComponent } from './calidad-vino.component';

describe('CalidadVinoComponent', () => {
  let component: CalidadVinoComponent;
  let fixture: ComponentFixture<CalidadVinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalidadVinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalidadVinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
