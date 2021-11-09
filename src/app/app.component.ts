import { Component } from '@angular/core';
import { HeroService } from './service/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Tour of Heroes';
  isAdmin: boolean = false;

  constructor(private heroService: HeroService) { 
    this.isAdmin = this.heroService.isAdmin;
  }
}
