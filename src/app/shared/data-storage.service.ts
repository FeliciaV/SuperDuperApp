import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
        private recipeService: RecipeService) {
    }

    storeRecipes() {
        const url = 'https://ng-recipe-book-1e91b.firebaseio.com/recipes.json';
        return this.http.put(url, this.recipeService.getRecipes());
    }

    getRecipes() {
        const url = 'https://ng-recipe-book-1e91b.firebaseio.com/recipes.json';
        return this.http.get(url)
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            console.log(recipe);
                            recipe['ingredients'] = [];
                        }
                    }

                    return recipes;
                }
            )
            .subscribe( (recipes: Recipe[]) => {
                // const recipes: Recipe[] = response.json();
                this.recipeService.setRecipes(recipes);
            } );
    }
}
