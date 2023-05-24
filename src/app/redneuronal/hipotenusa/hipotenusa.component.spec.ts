import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HipotenusaComponent } from './hipotenusa.component';

describe('HipotenusaComponent', () => {
  let component: HipotenusaComponent;
  let fixture: ComponentFixture<HipotenusaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HipotenusaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HipotenusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
