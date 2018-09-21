import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionListComponent } from './list.component';

describe('ListComponent', () => {
  let component: PositionListComponent;
  let fixture: ComponentFixture<PositionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
