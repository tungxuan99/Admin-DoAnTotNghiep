import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10diemComponent } from './top10diem.component';

describe('Top10diemComponent', () => {
  let component: Top10diemComponent;
  let fixture: ComponentFixture<Top10diemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10diemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10diemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
