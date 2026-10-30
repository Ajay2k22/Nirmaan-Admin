import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';
import * as L from 'leaflet';
import { addIcons } from 'ionicons';
import {
  addOutline,
  removeOutline,
  locateOutline,
  layersOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-complaint-map',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="map-section">
      <div class="section-head">
        <h3>
          Complaint Locations
          <span class="badge">({{ activeCount }} active)</span>
        </h3>
      </div>
      <div class="map-wrap">
        <div id="complaintMap" class="leaflet-map"></div>
        <div class="map-controls">
          <button (click)="zoomIn()" title="Zoom In">
            <ion-icon name="add-outline"></ion-icon>
          </button>
          <button (click)="zoomOut()" title="Zoom Out">
            <ion-icon name="remove-outline"></ion-icon>
          </button>
          <button (click)="resetZoom()" title="Reset Zoom">
            <ion-icon name="locate-outline"></ion-icon>
          </button>
          <button (click)="toggleLayer()" title="Layers">
            <ion-icon name="layers-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .map-section {
        padding: 0 16px;
      }
      .section-head {
        display: flex;
        justify-content: space-between;
        margin: 16px 0 10px;
        h3 {
          font-size: 16px;
          font-weight: 800;
          margin: 0;
        }
        .badge {
          background: #e8f0ff;
          color: #1a56db;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 12px;
        }
      }
      .map-wrap {
        position: relative;
        height: 440px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid #e5e7eb;
      }
      .leaflet-map {
        height: 100%;
        width: 100%;
        z-index: 1;
      }
      .map-controls {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 400;
        display: flex;
        flex-direction: column;
        gap: 8px;
        button {
          width: 38px;
          height: 38px;
          background: #fff;
          border: none;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          display: grid;
          place-items: center;
          font-size: 20px;
          color: #111827;
          cursor: pointer;
          &:active {
            transform: scale(0.95);
          }
        }
      }
      ::ng-deep .red-large-marker {
        width: 34px;
        height: 34px;
        background: #dc2626;
        border: 4px solid #fff;
        border-radius: 50%;
        box-shadow:
          0 0 0 6px rgba(220, 38, 38, 0.25),
          0 6px 16px rgba(220, 38, 38, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 900;
        font-size: 18px;
      }
    `,
  ],
})
export class ComplaintMapComponent implements AfterViewInit, OnChanges {
  @Input() activeCount = 0;
  @Input() complaints: any[] = [];
  @Output() viewDetails = new EventEmitter<any>();
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private defaultCenter: L.LatLngExpression = [19.2, 73.19];
  private defaultZoom = 13;
  private isSatellite = false;
  private baseLayer!: L.TileLayer;
  private satelliteLayer!: L.TileLayer;

  constructor() {
    addIcons({ addOutline, removeOutline, locateOutline, layersOutline });
  }

  ngAfterViewInit() {
    setTimeout(() => this.initMap(), 300);
  }
  ngOnChanges() {
    if (this.map) this.updateMarkers();
  }

  initMap() {
    const el = document.getElementById('complaintMap');
    if (!el) return;
    this.map = L.map('complaintMap', {
      zoomControl: false,
      attributionControl: false,
    }).setView(this.defaultCenter, this.defaultZoom);
    this.baseLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 19 },
    ).addTo(this.map);
    this.satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19 },
    );
    this.updateMarkers();
  }

  // ✅ Zoom In
  zoomIn() {
    this.map?.zoomIn();
  }

  // ✅ Zoom Out
  zoomOut() {
    this.map?.zoomOut();
  }

  // ✅ Reset Zoom - back to default with all markers
  resetZoom() {
    if (!this.map) return;
    if (this.markers.length) {
      const group = L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.3));
    } else {
      this.map.setView(this.defaultCenter, this.defaultZoom);
    }
  }

  // ✅ Layer toggle
  toggleLayer() {
    if (!this.map) return;
    if (this.isSatellite) {
      this.map.removeLayer(this.satelliteLayer);
      this.baseLayer.addTo(this.map);
    } else {
      this.map.removeLayer(this.baseLayer);
      this.satelliteLayer.addTo(this.map);
    }
    this.isSatellite = !this.isSatellite;
  }

  updateMarkers() {
    if (!this.map) return;
    this.markers.forEach((m) => this.map.removeLayer(m));
    this.markers = [];
    this.complaints.forEach((c) => {
      if (!c.latitude || !c.longitude) return;
      const icon = L.divIcon({
        className: '',
        html: `<div class="red-large-marker">+</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      const marker = L.marker([c.latitude, c.longitude], { icon }).addTo(
        this.map,
      );
      marker.bindPopup(
        `<div style="font-weight:700;">${c.title}</div><div style="font-size:11px;">${c.desc || c.status}</div>`,
      );
      marker.on('mouseover', () => marker.openPopup());
      marker.on('click', () => this.viewDetails.emit(c));
      this.markers.push(marker);
    });
    if (this.markers.length) {
      const group = L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.3));
    }
  }
}
