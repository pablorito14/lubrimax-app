import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPcComponent } from './mantenimiento-pc.component';

describe('MantenimientoPcComponent', () => {
  let component: MantenimientoPcComponent;
  let fixture: ComponentFixture<MantenimientoPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
