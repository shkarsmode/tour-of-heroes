import { Component, OnInit, TemplateRef } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIfContext } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newvariables',
  templateUrl: './newvariables.component.html',
  styleUrls: ['./newvariables.component.less']
})
export class NewvariablesComponent implements OnInit {

  addNewForm!: FormGroup;
  heroesId?: number;
  isLoaded: boolean = false;
  isSend: boolean = true;

  constructor(
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void {
    this._createForm();
    this.isLoaded = HeroService.heroesName.includes('undefined') ? false : true;
    // this.value = this.heroesId[this.heroesId.length];
    this.getHeroes();
    
  }

  getHeroes(){ 
    this.heroService.getHeroes()
      .subscribe((heroes : any) => {
        HeroService.heroesName = heroes.map((e:any) => e.name);
        HeroService.heroesId = heroes.map((e:any) => e.id);
        this.heroesId = Number(HeroService.heroesId[HeroService.heroesId.length-1]) + 1; 
        this.heroesId = this.heroesId ? this.heroesId : 1; 
    });
  }

  private _createForm() {
    this.addNewForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(2), this.validateName]),
    });
  }

  addVar(){
    // console.log(this.addNewForm.get('name')!.value);
    this.isSend = false;
    this.heroService.putHero(this.addNewForm.get('name')!.value, 
    this.addNewForm.get('id')!.value.toString());
    setTimeout(()=> {this.isSend = true; this.location.back()}, 1500)
    // console.log(this.addNewForm.get('id')!.value.toString())
    // this.heroService.deleteHero()

  }

  validateName(c: FormControl) {
    return !(HeroService.heroesName.includes(c.value)) ? null : {
      validateName: {
        valid: false,
        wrong: 'This name is already there'
      }
    };
  }

  loadData(){
    // document.location.href = '/';
    // setTimeout(() => {
    //   document.location.href = '/newvariable';
    // }, 2000);
  }


}
