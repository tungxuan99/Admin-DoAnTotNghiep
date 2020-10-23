import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonhocComponent } from './monhoc.component';

describe('MonhocComponent', () => {
  let component: MonhocComponent;
  let fixture: ComponentFixture<MonhocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonhocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonhocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
