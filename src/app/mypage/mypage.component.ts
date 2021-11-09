import { Component, OnInit } from '@angular/core';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.less']
})
export class MypageComponent implements OnInit {

  name: string = '';
  password: string = '';
  isCorrect: boolean = true;
  isAdmin: boolean = false;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.isAdmin = this.heroService.isAdmin;
  }
  

  submit(){
    this.heroService.loginUser(this.name, this.password);
  }

  logout(){
    this.heroService.logoutUser();

  }

}
