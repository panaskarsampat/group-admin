import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildComponentsComponent } from './child-components.component';

describe('ChildComponentsComponent', () => {
  let component: ChildComponentsComponent;
  let fixture: ComponentFixture<ChildComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
