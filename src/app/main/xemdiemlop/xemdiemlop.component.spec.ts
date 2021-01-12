import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemdiemlopComponent } from './xemdiemlop.component';

describe('XemdiemlopComponent', () => {
  let component: XemdiemlopComponent;
  let fixture: ComponentFixture<XemdiemlopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemdiemlopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemdiemlopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
