import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../service/hero.service';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  isLoaded: boolean = false;
  isLoading: number[] = [];
  isAdmin: boolean = false;
  // selectedHero? : Hero;

  constructor(private heroService: HeroService, 
    public messageService: MessageService,
    private router: Router) { }

  // onSelect(hero: Hero) : void{
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id = ${hero.id}`);
  // }

  ngOnInit(): void {
    this.getHeroes();
    this.isAdmin = this.heroService.isAdmin;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes : any) => {
        this.heroes = heroes;
        this.isLoaded = this.heroService.isLoaded = true; 
        HeroService.heroesName = heroes.map((e:any) => e.name)
        HeroService.heroesId = heroes.map((e:any) => e.id)
    });
  }

  deleteHero(hero: Hero){
    let id = hero.id ? hero.id : 0;
    this.isLoading.push(id);
    this.heroService.deleteHero(hero);
    setTimeout(()=> {
      this.isLoading = [];
      this.router.navigate(['/newvariable']);
      setTimeout(()=> this.router.navigate(['/heroes']), 0)
    }, 700);
  }

  getData(): void {
    this.heroService.getSomeDate();
  }
  getDataOut(): void{
   
  }
}