import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: TypeEditComponent;
  let fixture: ComponentFixture<TypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
