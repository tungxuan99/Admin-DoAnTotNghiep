import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemdiemhkComponent } from './xemdiemhk.component';

describe('XemdiemhkComponent', () => {
  let component: XemdiemhkComponent;
  let fixture: ComponentFixture<XemdiemhkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemdiemhkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemdiemhkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
