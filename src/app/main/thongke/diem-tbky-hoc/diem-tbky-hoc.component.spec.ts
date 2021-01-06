import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiemTBKyHocComponent } from './diem-tbky-hoc.component';

describe('DiemTBKyHocComponent', () => {
  let component: DiemTBKyHocComponent;
  let fixture: ComponentFixture<DiemTBKyHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiemTBKyHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiemTBKyHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
