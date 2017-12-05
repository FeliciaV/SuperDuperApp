import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected= new EventEmitter<Recipe>();

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
}
