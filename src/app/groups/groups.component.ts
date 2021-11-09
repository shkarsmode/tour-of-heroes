import { Component, OnInit } from '@angular/core';
import { Group } from '../interfaces/group';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];
  heroes: Hero[] = [];
  id_heroes: any;
  hide: number[] = [];
  id: any = 0;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getGroups()
      .subscribe((el:any) => {
        this.groups = el;
        this.id_heroes = this.groups.map(el => el.id_heroes)
        console.log(this.id_heroes)
      });
    this.heroService.getHeroes()
      .subscribe((el:any) => this.heroes = el)
  }

  toggleShow(id: any){
    let ind = this.hide.indexOf(id);
    console.log(ind)
    if(ind != -1) delete this.hide[ind];
    else this.hide.push(id)
  }

}
