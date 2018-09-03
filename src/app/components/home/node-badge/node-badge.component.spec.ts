import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeBadgeComponent } from './node-badge.component';

describe('NodeBadgeComponent', () => {
  let component: NodeBadgeComponent;
  let fixture: ComponentFixture<NodeBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
