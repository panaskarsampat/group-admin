import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkListComponent } from './list.component';

describe('ListComponent', () => {
  let component: WorkListComponent;
  let fixture: ComponentFixture<WorkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
