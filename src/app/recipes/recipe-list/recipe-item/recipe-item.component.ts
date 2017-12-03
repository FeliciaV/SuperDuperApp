import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input() recipe: Recipe;
  //// @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
    console.log(this.recipe);
  }

  // onSelect(recipe: Recipe) {
  //   this.selectedRecipe.emit(recipe);
  //   console.log('Selected Recipe:' + recipe.name + ' ' + recipe.description);
  // }

}