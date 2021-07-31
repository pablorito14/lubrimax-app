import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPcComponent } from './editar-pc.component';

describe('EditarPcComponent', () => {
  let component: EditarPcComponent;
  let fixture: ComponentFixture<EditarPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
