import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiemtbComponent } from './diemtb.component';

describe('DiemtbComponent', () => {
  let component: DiemtbComponent;
  let fixture: ComponentFixture<DiemtbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiemtbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiemtbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
