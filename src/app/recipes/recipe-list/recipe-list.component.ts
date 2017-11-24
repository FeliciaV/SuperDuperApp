import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('test', 'descr', 'https://www.ndtv.com/cooks/images/620-7.jpg'),
    // tslint:disable-next-line:max-line-length
    new Recipe('test 2', 'a new recipe', 'http://wdy.h-cdn.co/assets/cm/15/09/54ef91e0efb7c_-_grilled-caprese-salad-pizza-recipe-wdy0713-xl.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
