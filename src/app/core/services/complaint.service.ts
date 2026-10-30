import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints';

export interface Complaint {
  userId: string;
  photo: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED' | string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | string;
  longitude: number;
  latitude: number;
  reason: string;
  complaintId: string;
  summary: string;
  createdAt: string;
  title: string;
  description: string;
  category?: string;
  address?: string;
  mnc?: string;
  dept?: string;
  isResolved?: boolean;
  resolvedAt?: string | null;
  resolvedProofImg?: string | null;
}

@Injectable({ providedIn: 'root' })
export class ComplaintService {
  constructor(private http: HttpClient) {}

  getAllComplaints(
    mnc_code = 'Ambernath',
    dept_code = 'ROADS',
  ): Observable<Complaint[]> {
    let params = new HttpParams()
      .set('mnc_code', mnc_code)
      .set('dept_code', dept_code);
    return this.http
      .get<any>(API_ENDPOINTS.COMPLAINTS.GET_ALL_COMPLAINTS, { params })
      .pipe(map((res) => res.data || []));
  }

  getComplaintByComplaintId(
    complaintId: string,
    mnc_code = 'Ambernath',
    dept_code = 'ROADS',
  ): Observable<Complaint> {
    let params = new HttpParams()
      .set('mnc_code', mnc_code)
      .set('dept_code', dept_code)
      .set('complaintId', complaintId);
    return this.http
      .get<any>(API_ENDPOINTS.COMPLAINTS.COMPLAINTS_BY_ID, { params })
      .pipe(map((res) => (res.data || res) as Complaint));
  }

  getAllComplaintsForLoggedAdmin(): Observable<Complaint[]> {
    const mnc = localStorage.getItem('nirmaan_mnc_code') || 'Ambernath';
    const dept = localStorage.getItem('nirmaan_dept_code') || 'ROADS';
    return this.getAllComplaints(mnc, dept);
  }

  getComplaintByIdForLoggedAdmin(complaintId: string): Observable<Complaint> {
    const mnc = localStorage.getItem('nirmaan_mnc_code') || 'Ambernath';
    const dept = localStorage.getItem('nirmaan_dept_code') || 'ROADS';
    return this.getComplaintByComplaintId(complaintId, mnc, dept);
  }

  // ✅ FIXED - no BASE property
  resolveComplaint(formData: FormData): Observable<any> {
    // Derive base URL from existing endpoint (e.g., https://api.../Admin/getAllComplaints -> /Admin/resolve)
    const base = API_ENDPOINTS.COMPLAINTS.GET_ALL_COMPLAINTS.replace(
      '/getAllComplaints',
      '',
    );
    const url = `${base}/resolve`;
    return this.http.post(url, formData);
  }

  clearCache() {}
}
