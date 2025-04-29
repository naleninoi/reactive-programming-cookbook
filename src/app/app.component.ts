import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { Recipe } from './types/recipes.type';
import { RecipesService } from './services/recipes.service';

@Component({
    selector: 'app-root',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        RecipesListComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('searchNameInput') searchNameInputElement!: ElementRef;

    @ViewChild('searchIngredientInput') searchIngredientInputElement!: ElementRef;

    title = 'Reactive-Programming-Cookbook';

    recipes: Recipe[] = [];

    constructor(private recipesService: RecipesService) {
        this.recipesService.getRecipes$().subscribe(recipes => this.recipes = recipes);
    }

    ngAfterViewInit(): void {
    }

}
