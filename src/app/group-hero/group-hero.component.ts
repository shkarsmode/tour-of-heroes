import { Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Group } from '../interfaces/group';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-group-hero',
  templateUrl: './group-hero.component.html',
  styleUrls: ['./group-hero.component.less']
})
export class GroupHeroComponent implements OnInit {

  heroes?: Hero[];
  groups?: Group[];
  selectHero: any;
  selectGroup: any;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe((el:any) => {this.heroes = el; });
    this.heroService.getGroups()
      .subscribe((el:any) => {
        this.groups = el;
        // this.selectGroup = el[0].name
      });
  }

  addHeroGroup(){
    // let length = Object.entries(this.groups![this.selectGroup-1].id_heroes).length;
    let arrayIdHeroes: Array<number> = [];
    Object.entries(this.groups![this.selectGroup-1].id_heroes).forEach(el => {
      arrayIdHeroes.push(el[1]);
    })
    if(!arrayIdHeroes.indexOf(Number(this.selectHero))) console.log('hero is already here');
    else {
      arrayIdHeroes.push(Number(this.selectHero));
      arrayIdHeroes = arrayIdHeroes.sort((a, b) => a - b)
      this.heroService.changeHeroList(this.selectGroup, arrayIdHeroes);
      setTimeout(() => location.reload(), 500);
    }

  }

}
