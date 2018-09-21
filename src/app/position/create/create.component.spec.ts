import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: PositionCreateComponent;
  let fixture: ComponentFixture<PositionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
