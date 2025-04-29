import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { Recipe } from './types/recipes.type';
import { RecipesService } from './services/recipes.service';
import { combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, startWith, switchMap } from 'rxjs';

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
        const searchNameInputValue$ = fromEvent<InputEvent>(this.searchNameInputElement.nativeElement, 'input')
            .pipe(
                map(searchInput => (searchInput.target as HTMLInputElement).value),
                startWith('')
            )

        const searchIngredientInputValue$ = fromEvent<InputEvent>(this.searchIngredientInputElement.nativeElement, 'input')
            .pipe(
                map(searchInput => (searchInput.target as HTMLInputElement).value),
                startWith('')
            )

        combineLatest({
            searchName: searchNameInputValue$,
            searchIngredient: searchIngredientInputValue$
        }).pipe(
            debounceTime(500),
            distinctUntilChanged((prev, curr) =>
                prev.searchName === curr.searchName && prev.searchIngredient === curr.searchIngredient),
            switchMap(({searchName, searchIngredient}) =>
                this.recipesService.searchRecipes$(searchName, searchIngredient))
        ).subscribe(recipes => this.recipes = recipes);
    }

}
