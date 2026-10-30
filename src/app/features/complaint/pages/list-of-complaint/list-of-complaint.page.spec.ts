import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfComplaintPage } from './list-of-complaint.page';

describe('ListOfComplaintPage', () => {
  let component: ListOfComplaintPage;
  let fixture: ComponentFixture<ListOfComplaintPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfComplaintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
