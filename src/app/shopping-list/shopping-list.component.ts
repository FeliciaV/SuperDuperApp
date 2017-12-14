import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [];
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;
  // ingredients: Ingredient[] = [
  //   new Ingredient('pepper', 1.5),
  //   new Ingredient('sugar', 2)
  // ];

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getShoppingList();
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.shoppingListService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
    //   );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /*onIngredientAdded(newIngredient: Ingredient) {
    console.log('new ingredient: ' + newIngredient.amount + ' ' + newIngredient.name);
    // this.ingredients.push(newIngredient);

  }*/

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.shoppingListService.startedEditing.next(index);
  }
}
