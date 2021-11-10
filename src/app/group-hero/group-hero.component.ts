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

  getHeroesGroupId(selectGroup: number) : Array<number>{
    let arrayIdHeroes: Array<number> = [];
    Object.entries(this.groups![selectGroup-1].id_heroes).forEach(el => {
      arrayIdHeroes.push(el[1]);
    });
    return arrayIdHeroes;
  }

  addHeroGroup(){
    let arrayIdHeroes: Array<number> = [];
    arrayIdHeroes = this.getHeroesGroupId(this.selectGroup);

    if(arrayIdHeroes.indexOf(Number(this.selectHero))!= -1) 
      console.log('hero is already here');
    
    else{
      let groupArrBefore: any = [];
      let groupIdBefore: any;
  
      this.groups!.forEach(el => {
        Object.entries(el.id_heroes).forEach((hr):any =>  {
          if(hr[1] == Number(this.selectHero)){
            groupIdBefore = el.id;
            groupArrBefore = this.getHeroesGroupId(groupIdBefore)
              .filter(e => e!= Number(this.selectHero));
          }
        });
      });
      
      if(groupIdBefore)
        this.heroService.changeHeroList(groupIdBefore, groupArrBefore);

      arrayIdHeroes.push(Number(this.selectHero));
      arrayIdHeroes = arrayIdHeroes.sort((a, b) => a - b)
      this.heroService.changeHeroList(this.selectGroup, arrayIdHeroes);
      setTimeout(() => location.reload(), 500);
    }    
  }
}
