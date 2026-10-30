import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  copyOutline,
  warningOutline,
  documentTextOutline,
  appsOutline,
  locationOutline,
  navigateOutline,
  imagesOutline,
  cameraOutline,
  shieldCheckmarkOutline,
  clipboardOutline,
  closeCircleOutline,
  checkmarkCircleOutline,
  syncOutline,
  constructOutline,
} from 'ionicons/icons';
import {
  ComplaintService,
  Complaint,
} from '../../../../core/services/complaint.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.page.html',
  styleUrls: ['./view-complaint.page.scss'],
  standalone: false,
})
export class ViewComplaintPage implements OnInit {
  complaint: Complaint | null = null;
  loading = true;
  complaintId = '';
  summaryOfIssue = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private complaintService: ComplaintService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {
    addIcons({
      timeOutline,
      copyOutline,
      warningOutline,
      documentTextOutline,
      appsOutline,
      locationOutline,
      navigateOutline,
      imagesOutline,
      cameraOutline,
      shieldCheckmarkOutline,
      clipboardOutline,
      closeCircleOutline,
      checkmarkCircleOutline,
      syncOutline,
      constructOutline,
    });
  }

  ngOnInit() {
    this.complaintId = this.route.snapshot.paramMap.get('id') || '';
    this.hideBottomNav();
    this.loadComplaint();
  }
  ionViewWillEnter() {
    this.hideBottomNav();
  }
  ionViewWillLeave() {
    this.showBottomNav();
  }
  hideBottomNav() {
    const nav = document.querySelector('.custom-bottom-nav') as HTMLElement;
    if (nav) nav.style.display = 'none';
  }
  showBottomNav() {
    const nav = document.querySelector('.custom-bottom-nav') as HTMLElement;
    if (nav) nav.style.display = 'flex';
  }
  get isDisabled(): boolean {
    const s = this.complaint?.status?.toUpperCase();
    return s === 'RESOLVED' || s === 'REJECTED';
  }
  loadComplaint() {
    if (!this.complaintId) {
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    this.loading = true;
    this.cdr.detectChanges();
    this.complaintService
      .getComplaintByIdForLoggedAdmin(this.complaintId)
      .subscribe({
        next: (data: Complaint) => {
          this.ngZone.run(() => {
            this.complaint = data;
            this.summaryOfIssue =
              (data as any).summaryOfIssue ||
              (data as any).summary ||
              (data as any).reason ||
              '';
            this.loading = false;
            this.cdr.detectChanges();
          });
        },
        error: () => {
          this.ngZone.run(() => {
            this.loading = false;
            this.cdr.detectChanges();
            this.toast.error('Failed to load');
          });
        },
      });
  }
  onFileSelected(event: any) {
    if (this.isDisabled) return;
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
      this.cdr.detectChanges();
    }
  }

  onApprove() {
    if (this.isDisabled) return;
    if (!this.selectedFile) {
      this.toast.error('Please add after repair image');
      return;
    }
    if (!this.summaryOfIssue.trim()) {
      this.toast.error('Please add note');
      return;
    }
    this.isSubmitting = true;
    const fd = new FormData();
    fd.append('ComplaintId', this.complaintId);
    fd.append('Status', 'RESOLVED');
    fd.append('Summary_Of_Issue', this.summaryOfIssue);
    fd.append('Proof_Img', this.selectedFile);

    this.complaintService.resolveComplaint(fd).subscribe({
      next: (res: any) => {
        this.ngZone.run(() => {
          this.isSubmitting = false;
          // ✅ Use mssg from backend - both success cases
          this.toast.success(
            res.mssg || res.message || 'Resolved - AI verified',
          );
          this.cdr.detectChanges();
          setTimeout(
            () => this.router.navigate(['/tabs/list-of-complaint']),
            800,
          );
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.isSubmitting = false;
          // ✅ Use mssg from backend - your anime case will show "The proof image is completely unrelated..."
          const errorRes = err.error || {};
          this.toast.error(
            errorRes.mssg || errorRes.reason || errorRes.message || 'Failed',
          );
          if (errorRes.isFake) {
            this.toast.warning('Fake image detected: ' + errorRes.reason);
          }
          this.cdr.detectChanges();
        });
      },
    });
  }

  onReject() {
    if (this.isDisabled) return;
    this.isSubmitting = true;
    const fd = new FormData();
    fd.append('ComplaintId', this.complaintId);
    fd.append('Status', 'REJECTED');
    fd.append('Summary_Of_Issue', this.summaryOfIssue || 'Rejected');
    if (this.selectedFile) fd.append('Proof_Img', this.selectedFile);

    this.complaintService.resolveComplaint(fd).subscribe({
      next: (res: any) => {
        this.ngZone.run(() => {
          this.isSubmitting = false;
          // ✅ Use mssg
          this.toast.warning(res.mssg || 'Rejected');
          this.cdr.detectChanges();
          setTimeout(
            () => this.router.navigate(['/tabs/list-of-complaint']),
            800,
          );
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.isSubmitting = false;
          const errorRes = err.error || {};
          this.toast.error(errorRes.mssg || errorRes.message || 'Failed');
          this.cdr.detectChanges();
        });
      },
    });
  }
}
