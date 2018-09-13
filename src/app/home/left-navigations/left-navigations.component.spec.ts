import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftNavigationsComponent } from './left-navigations.component';

describe('LeftNavigationsComponent', () => {
  let component: LeftNavigationsComponent;
  let fixture: ComponentFixture<LeftNavigationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftNavigationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
