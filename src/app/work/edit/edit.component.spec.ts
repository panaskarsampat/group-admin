import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: WorkEditComponent;
  let fixture: ComponentFixture<WorkEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
