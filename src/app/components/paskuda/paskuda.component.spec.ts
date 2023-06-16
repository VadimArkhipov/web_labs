import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaskudaComponent } from './paskuda.component';

describe('PaskudaComponent', () => {
  let component: PaskudaComponent;
  let fixture: ComponentFixture<PaskudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaskudaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaskudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
