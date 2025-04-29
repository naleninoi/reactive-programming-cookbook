import { Routes } from '@angular/router';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

export const routes: Routes = [
    { path: '', component: RecipesListComponent },
    { path: 'recipes/:id', component: RecipeDetailsComponent },
];
