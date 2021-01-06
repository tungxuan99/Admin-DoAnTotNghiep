import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDiemComponent } from './export-diem.component';

describe('ExportDiemComponent', () => {
  let component: ExportDiemComponent;
  let fixture: ComponentFixture<ExportDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
