import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    // recipeSelected= new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'test',
            'descr',
            'https://www.ndtv.com/cooks/images/620-7.jpg',
            [
                new Ingredient('Salt', 2),
                new Ingredient('Lemon', 4)
            ]
        ),
        // tslint:disable-next-line:max-line-length
        new Recipe(
            'test 2',
            'a new recipe',
            'http://wdy.h-cdn.co/assets/cm/15/09/54ef91e0efb7c_-_grilled-caprese-salad-pizza-recipe-wdy0713-xl.jpg',
            [
                new Ingredient('Pepper', 0.5),
                new Ingredient('Rice', 5)
            ]
        )
      ];

    constructor(private sls: ShoppingListService) {

    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.sls.addIngredients(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}
