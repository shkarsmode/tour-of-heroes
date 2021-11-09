import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  heroes: any[] = [];
  isLoaded: boolean = false;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe((heroes: any) => {
        this.heroes = heroes.slice(0, 4); 
        this.isLoaded = this.heroService.isLoaded = true;});
      }
    
  }
