import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Group } from '../interfaces/group';
import { Hero } from '../interfaces/hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  isAdmin: boolean = false;
  nameAdmin: string = '';
  passwordAdmin: string = '';

  constructor(private messageService: MessageService,
    private http: HttpClient) { 
      this.isLoaded = false;
      if(localStorage['name'] && localStorage['password'])
        this.isAdmin = true;
    }

  isLoaded: boolean = false;
  public static heroesName = ['undefined'];
  public static heroesId = ['undefined'];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes = (): any => {
    return this.http.get('https://6185696e23a2fe0017fff603.mockapi.io/api/heroes/heroes');
  }

  getHero = (id: number): any => {
    this.messageService.add(`HeroService: fetched hero id ${id}`)
    return this.http.get(`https://6185696e23a2fe0017fff603.mockapi.io/api/heroes/heroes/${id}`)
  }

  putHero = (name: string, id: string): any => {
    this.messageService.add(`HeroService: put ${id} - ${name}`);
    return this.http.post<any>('https://6185696e23a2fe0017fff603.mockapi.io/api/heroes/heroes',
      { id : id, name : name  }).subscribe();
  }

  changeHeroList = (id: string, arr: number[]): any => {
    return this.http.put<any>(`https://6185696e23a2fe0017fff603.mockapi.io/api/heroes/groups/${id}`,
      { id_heroes: arr  }).subscribe(el => console.log(el));
  }

  deleteHero (hero: Hero): any {
    this.messageService.add(`HeroService: delete ${hero.id} - ${hero.name}`);
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `https://6185696e23a2fe0017fff603.mockapi.io/api/heroes/heroes/${id}`;
    return this.http.delete<any>(url) //, this.httpOptions
      .subscribe(el => console.log(el));
  }

  getGroups() : any{
    this.messageService.add(`HeroService: get groups`);
    return this.http.get('https://6185696e23a2fe0017fff603.mockapi.io/api/heroes/groups');
  }

  loginUser(name: string, password: string): any{
    this.http.get(`https://6185696e23a2fe0017fff603.mockapi.io/api/heroes/admin/1`)
      .subscribe((el: any) => {
        if(el.name == name && el.password == password) {
          localStorage.setItem('name', name);
          localStorage.setItem('password', password);
          setTimeout(()=>location.reload(), 500);
          this.messageService.add(`HeroService: You are logged in`);
        } else {
          this.messageService.add(`HeroService: Incorrectly entered data`);
        }
      });
  }

  logoutUser(){
    localStorage.clear();
    setTimeout(()=>location.reload(),500);
    this.messageService.add(`HeroService: Logout from the system`);
  }

  saveHero(hero: Hero){
    this.messageService.add(`HeroService: new name for ${hero.id} -> ${hero.name}`);
    this.http.put(`https://6185696e23a2fe0017fff603.mockapi.io/api/heroes/heroes/${hero.id}`, { name : hero.name })
      .subscribe(el => {
        setTimeout(()=>location.reload(),300);
      });
  }

  getSomeDate(): any {
    
  }

}
