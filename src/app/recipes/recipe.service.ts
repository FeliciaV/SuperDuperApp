import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";

export class RecipeService {
    recipeSelected= new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('test', 'descr', 'https://www.ndtv.com/cooks/images/620-7.jpg'),
        // tslint:disable-next-line:max-line-length
        new Recipe('test 2', 'a new recipe', 'http://wdy.h-cdn.co/assets/cm/15/09/54ef91e0efb7c_-_grilled-caprese-salad-pizza-recipe-wdy0713-xl.jpg')
      ];

    getRecipes() {
        return this.recipes.slice();
    }
}
