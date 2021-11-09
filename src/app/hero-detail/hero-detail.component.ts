import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// import { Heroes } from '../data/mock-heroes';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private route: ActivatedRoute,
      private location: Location,
      private heroService: HeroService) { 
        this.isAdmin = this.heroService.isAdmin
  }

  hero: any = {};
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getHero();
  }

  getHero(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe((h: any) => this.hero = h);
  }

  goBack(){
    this.location.back();
  }

  saveHero(hero: Hero){
    this.isLoading = true;
    this.heroService.saveHero(hero);
  }

}
