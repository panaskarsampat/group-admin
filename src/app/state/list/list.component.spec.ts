import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateListComponent } from './list.component';

describe('ListComponent', () => {
  let component: StateListComponent;
  let fixture: ComponentFixture<StateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
