import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  // ingredients: Ingredient[] = [
  //   new Ingredient('pepper', 1.5),
  //   new Ingredient('sugar', 2)
  // ];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingList();
    this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
      );
  }

  /*onIngredientAdded(newIngredient: Ingredient) {
    console.log('new ingredient: ' + newIngredient.amount + ' ' + newIngredient.name);
    // this.ingredients.push(newIngredient);
    
  }*/
}
