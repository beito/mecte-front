import { Location, LocationStrategy } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { GradientConfig } from '../../app-config';

@Component({
  selector: 'app-mecte',
  templateUrl: './mecte.component.html',
  styleUrls: ['./mecte.component.scss']
})
export class MecteComponent implements OnInit {
  // public props
  gradientConfig;
  navCollapsed: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;

  // constructor
  constructor(private zone: NgZone, private location: Location, private locationStrategy: LocationStrategy) {
    this.gradientConfig = GradientConfig;
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    this.windowWidth = window.innerWidth;

    if (
      current_url === baseHref + '/layout/collapse-menu' ||
      current_url === baseHref + '/layout/box' ||
      (window.innerWidth >= 992 && window.innerWidth <= 1024)
    ) {
      GradientConfig.isCollapse_menu = true;
    }

    this.navCollapsed = window.innerWidth >= 992 ? GradientConfig.isCollapse_menu : false;
    this.navCollapsedMob = false;
  }

  // life cycle event
  ngOnInit() {
    if (window.innerWidth < 992) {
      GradientConfig.layout = 'vertical';
      setTimeout(() => {
        document.querySelector('.pcoded-navbar')?.classList.add('menupos-static');
        (document.querySelector('#nav-ps-gradient-able') as HTMLElement).style.maxHeight = '100%'; // 100%
      }, 500);
    }
  }

  // public method
  navMobClick() {
    if (window.innerWidth < 992) {
      if (this.navCollapsedMob && !document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
        this.navCollapsedMob = !this.navCollapsedMob;
        setTimeout(() => {
          this.navCollapsedMob = !this.navCollapsedMob;
        }, 100);
      } else {
        this.navCollapsedMob = !this.navCollapsedMob;
      }
    }
  }
}