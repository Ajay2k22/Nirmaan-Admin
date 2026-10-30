import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import {
  ComplaintService,
  Complaint,
} from '../../../../core/services/complaint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-complaint',
  templateUrl: './list-of-complaint.page.html',
  styleUrls: ['./list-of-complaint.page.scss'],
  standalone: false,
})
export class ListOfComplaintPage implements OnInit {
  allComplaints: Complaint[] = [];
  filteredComplaints: Complaint[] = [];
  loading = true;
  searchText = '';
  selectedFilter: 'ALL' | 'PENDING' | 'RESOLVED' | 'REJECTED' = 'ALL';

  // ✅ All chips including In-Progress, but we filter it out
  allFilterChips = [
    { key: 'ALL', label: 'All', count: 0 },
    { key: 'PENDING', label: 'Pending', count: 0 },
    { key: 'IN_PROGRESS', label: 'In Progress', count: 0 },
    { key: 'RESOLVED', label: 'Resolved', count: 0 },
    { key: 'REJECTED', label: 'Rejected', count: 0 },
  ];

  get filterChips() {
    // ✅ Remove IN_PROGRESS chip from UI, but keep component
    return this.allFilterChips.filter((c) => c.key !== 'IN_PROGRESS');
  }

  constructor(
    private complaintService: ComplaintService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    this.loading = true;
    this.complaintService.getAllComplaintsForLoggedAdmin().subscribe({
      next: (data: Complaint[]) => {
        this.ngZone.run(() => {
          this.allComplaints = data;
          this.updateChipCounts(data);
          this.applyFilter();
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
    });
  }

  updateChipCounts(data: Complaint[]) {
    this.allFilterChips = this.allFilterChips.map((chip) => {
      if (chip.key === 'ALL') return { ...chip, count: data.length };
      if (chip.key === 'PENDING')
        return {
          ...chip,
          count: data.filter((c) => c.status?.toUpperCase() === 'PENDING')
            .length,
        };
      if (chip.key === 'IN_PROGRESS')
        return {
          ...chip,
          count: data.filter((c) =>
            ['IN_PROGRESS', 'INPROGRESS'].includes(c.status?.toUpperCase()),
          ).length,
        };
      if (chip.key === 'RESOLVED')
        return {
          ...chip,
          count: data.filter((c) =>
            ['RESOLVED', 'APPROVED'].includes(c.status?.toUpperCase()),
          ).length,
        };
      if (chip.key === 'REJECTED')
        return {
          ...chip,
          count: data.filter((c) => c.status?.toUpperCase() === 'REJECTED')
            .length,
        };
      return chip;
    });
  }

  // ✅ Filter logic for Resolved and Rejected
  filterByStatus(status: string) {
    this.selectedFilter = status as any;
    this.applyFilter();
  }

  applyFilter() {
    let filtered = [...this.allComplaints];
    if (this.selectedFilter === 'PENDING') {
      filtered = filtered.filter((c) => c.status?.toUpperCase() === 'PENDING');
    } else if (this.selectedFilter === 'RESOLVED') {
      filtered = filtered.filter((c) =>
        ['RESOLVED', 'APPROVED'].includes(c.status?.toUpperCase()),
      );
    } else if (this.selectedFilter === 'REJECTED') {
      filtered = filtered.filter((c) => c.status?.toUpperCase() === 'REJECTED');
    }
    if (this.searchText.trim()) {
      const q = this.searchText.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.complaintId?.toLowerCase().includes(q) ||
          c.title?.toLowerCase().includes(q),
      );
    }
    this.filteredComplaints = filtered;
  }

  onSearch(text: string) {
    this.searchText = text;
    this.applyFilter();
  }
  viewComplaint(complaint: any) {
    this.router.navigate([
      '/tabs/view-complaint',
      complaint.complaintId || complaint.id,
    ]);
  }
}
