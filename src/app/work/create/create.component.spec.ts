import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: WorkCreateComponent;
  let fixture: ComponentFixture<WorkCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
