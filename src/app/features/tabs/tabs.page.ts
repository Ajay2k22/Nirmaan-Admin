import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { addIcons } from 'ionicons';
import { appsOutline, clipboardOutline } from 'ionicons/icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {
  activeTab = 'dashboard';

  constructor(private router: Router) {
    addIcons({ appsOutline, clipboardOutline });
  }

  ngOnInit() {
    // Detect active tab from URL
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.includes('dashboard')) {
          this.activeTab = 'dashboard';
        } else if (
          event.url.includes('list-of-complaint') ||
          event.url.includes('complaints')
        ) {
          this.activeTab = 'list-of-complaint';
        }
      });

    // Set initial
    if (this.router.url.includes('list-of-complaint')) {
      this.activeTab = 'list-of-complaint';
    }
  }

  goTo(tab: string) {
    this.activeTab = tab;
    this.router.navigate(['/tabs', tab]);
  }
}
