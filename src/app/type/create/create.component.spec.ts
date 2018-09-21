import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: TypeCreateComponent;
  let fixture: ComponentFixture<TypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
