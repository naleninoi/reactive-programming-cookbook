import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe, RecipeDetails } from '../types/recipes.type';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    constructor(private httpClient: HttpClient) {
    }

    getRecipes$(): Observable<Recipe[]> {
        return this.httpClient.get<Recipe[]>(
            'https://super-recipes.com/api/recipes'
        );
    }

    searchRecipes$(searchTerm?: string, searchIngredient?: string): Observable<Recipe[]> {
        let httpParams = new HttpParams();

        if (searchTerm) {
            httpParams = httpParams.append('name', searchTerm);
        }

        if (searchIngredient) {
          httpParams = httpParams.append('ingredient', searchIngredient);
        }

        return this.httpClient.get<Recipe[]>('https://super-recipes.com/api/recipes', {params: httpParams});
    }

    getRecipeById$(id: number): Observable<Recipe> {
        return this.httpClient.get<Recipe>(
            `https://super-recipes.com/api/recipe?id=${id}`
        );
    }

    getRecipeDetails$(id: number): Observable<{ recipe: Recipe; details: RecipeDetails }> {
        return this.getRecipeById$(id).pipe(
            switchMap((recipe: Recipe) => {
                return this.httpClient
                    .get<RecipeDetails>(
                        `https://super-recipes.com/api/recipe/details?id=${id}`
                    )
                    .pipe(map((details) => ({ recipe, details })));
            })
        );
    }
}
