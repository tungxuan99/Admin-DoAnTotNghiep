import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemdiemmonComponent } from './xemdiemmon.component';

describe('XemdiemmonComponent', () => {
  let component: XemdiemmonComponent;
  let fixture: ComponentFixture<XemdiemmonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemdiemmonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemdiemmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
