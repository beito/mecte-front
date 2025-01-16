import { Component, EventEmitter, Output } from '@angular/core';
import { GradientConfig } from 'src/app/app-config';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  // public props
  gradientConfig;
  menuClass: boolean;
  collapseStyle: string;
  windowWidth: number;

  @Output() NavCollapse = new EventEmitter();
  @Output() NavCollapsedMob = new EventEmitter();

  // constructor
  constructor() {
    this.gradientConfig = GradientConfig;
    this.menuClass = false;
    this.collapseStyle = 'none';
    this.windowWidth = window.innerWidth;
  }

  // public method
  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.collapseStyle = this.menuClass ? 'block' : 'none';

    if (window.innerWidth < 992) {
      if (document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
        this.NavCollapsedMob.emit();
      }
    }
  }

  navCollapse() {
    if (window.innerWidth >= 992) {
      this.NavCollapse.emit();
    }
  }

  NavCollapsedMob_(){
    this.NavCollapsedMob.emit();
    if(this.menuClass){
      this.menuClass = !this.menuClass;
      this.collapseStyle = this.menuClass ? 'block' : 'none';
    }
  }
}
