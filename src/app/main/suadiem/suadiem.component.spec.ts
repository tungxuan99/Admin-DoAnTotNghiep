import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuadiemComponent } from './suadiem.component';

describe('SuadiemComponent', () => {
  let component: SuadiemComponent;
  let fixture: ComponentFixture<SuadiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuadiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuadiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
