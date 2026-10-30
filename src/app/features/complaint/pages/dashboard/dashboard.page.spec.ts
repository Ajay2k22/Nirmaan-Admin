import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPage } from './dashboard.page';
import { ComplaintService } from '../../../core/services/complaint.service';
import { of } from 'rxjs';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let mockService: any;

  beforeEach(() => {
    mockService = {
      getAllComplaintsForLoggedAdmin: jasmine.createSpy().and.returnValue(
        of([
          {
            complaintId: '1',
            status: 'PENDING',
            latitude: 19.2,
            longitude: 73.1,
          },
          {
            complaintId: '2',
            status: 'RESOLVED',
            latitude: 19.3,
            longitude: 73.2,
          },
          {
            complaintId: '3',
            status: 'REJECTED',
            latitude: 19.4,
            longitude: 73.3,
          },
          {
            complaintId: '4',
            status: 'IN_PROGRESS',
            latitude: 19.5,
            longitude: 73.4,
          },
        ]),
      ),
    };
    TestBed.configureTestingModule({
      declarations: [DashboardPage],
      providers: [{ provide: ComplaintService, useValue: mockService }],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
  });

  // Unit test
  it('should calculate counts from API status', () => {
    component.ngOnInit();
    expect(component.counts.pending).toBe(1);
    expect(component.counts.approve).toBe(1);
    expect(component.counts.reject).toBe(1);
    expect(component.counts.inProgress).toBe(1);
  });

  it('should map complaints with lat/long for markers', () => {
    component.ngOnInit();
    expect(component.mapComplaints.length).toBe(4);
    expect(component.mapComplaints[0].latitude).toBe(19.2);
  });

  // Integration test
  it('should create map markers for each complaint', () => {
    spyOn(component as any, 'updateMarkers' as any);
    component.loadComplaints();
    expect(mockService.getAllComplaintsForLoggedAdmin).toHaveBeenCalled();
  });

  // Functionality test
  it('should navigate to view-complaint on marker click', () => {
    spyOn(component['router'], 'navigate');
    component.onViewDetails({ id: 'f4a93e97-640' });
    expect(component['router'].navigate).toHaveBeenCalledWith([
      '/tabs/view-complaint',
      'f4a93e97-640',
    ]);
  });
});
