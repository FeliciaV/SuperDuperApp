import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;
  // ingredients: Ingredient[] = [
  //   new Ingredient('pepper', 1.5),
  //   new Ingredient('sugar', 2)
  // ];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingList();
    this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /*onIngredientAdded(newIngredient: Ingredient) {
    console.log('new ingredient: ' + newIngredient.amount + ' ' + newIngredient.name);
    // this.ingredients.push(newIngredient);
    
  }*/
}
