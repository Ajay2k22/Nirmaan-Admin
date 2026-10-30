import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintService, Complaint } from '../../../../core/services/complaint.service';
import { addIcons } from 'ionicons';
import { hourglassOutline, constructOutline, checkmarkOutline, closeOutline, optionsOutline, layersOutline, locateOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  complaints: Complaint[] = [];
  loading = true;
  counts = { pending: 0, inProgress: 0, approve: 0, reject: 0 };
  mapComplaints: any[] = [];

  constructor(private complaintService: ComplaintService, private router: Router, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    addIcons({ hourglassOutline, constructOutline, checkmarkOutline, closeOutline, optionsOutline, layersOutline, locateOutline, addOutline });
  }

  ngOnInit() { this.loadComplaints(); }

  loadComplaints() {
    this.loading = true; this.cdr.detectChanges();
    this.complaintService.getAllComplaintsForLoggedAdmin().subscribe({
      next: (data: Complaint[]) => {
        this.ngZone.run(() => {
          this.complaints = data;
          this.counts.pending = data.filter(c => c.status?.toUpperCase()==='PENDING').length;
          this.counts.inProgress = data.filter(c => ['IN_PROGRESS','INPROGRESS'].includes(c.status?.toUpperCase())).length;
          this.counts.approve = data.filter(c => ['RESOLVED','APPROVED'].includes(c.status?.toUpperCase())).length;
          this.counts.reject = data.filter(c => c.status?.toUpperCase()==='REJECTED').length;
          this.mapComplaints = data.filter(c => c.latitude && c.longitude).map(c => ({
            id: c.complaintId, latitude: c.latitude, longitude: c.longitude, title: `${c.category} - ${c.title}`, status: c.status, desc: `${c.category} - ${c.status?.toLowerCase()}`
          }));
          this.loading = false; this.cdr.detectChanges();
        });
      },
      error: () => { this.ngZone.run(() => { this.loading = false; this.cdr.detectChanges(); }); }
    });
  }

  onViewDetails(c: any) { this.router.navigate(['/tabs/view-complaint', c.id]); }
}
