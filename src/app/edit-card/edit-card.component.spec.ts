import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardComponent } from './edit-card.component';

describe('EditCardComponent', () => {
  let component: EditCardComponent;
  let fixture: ComponentFixture<EditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
