import { delay, http, HttpResponse } from 'msw'
import { recipes, details, images } from './mock.json'

export const handlers = [
    http.get('https://super-recipes.com/api/recipes', async ({request}) => {
        const url = new URL(request.url);
        const recipeName = url.searchParams.get('name');
        const recipeIngredient = url.searchParams.get('ingredient');
        let filteredRecipes = recipes;

        if (recipeName) {
            filteredRecipes = filteredRecipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(recipeName.toLowerCase())
            );
        }

        if (recipeIngredient) {
            filteredRecipes = filteredRecipes.filter((recipe) =>
                recipe.ingredients.some((ingredient) =>
                    ingredient.toLowerCase().startsWith(recipeIngredient.toLowerCase())
                )
            );
        }


        return HttpResponse.json(filteredRecipes);
    }),

    http.get('https://super-recipes.com/api/recipe', async ({request}) => {
        // Construct a URL instance out of the intercepted request.
        const url = new URL(request.url)

        // Read the "id" URL query parameter using the "URLSearchParams" API.
        // Given "/product?id=1", "productId" will equal "1".
        const recipeId = url.searchParams.get('id')
        if (!recipeId) {
            return new HttpResponse(null, {status: 400})
        }

        const recipe = recipes.find((recipe) => recipe.id === +recipeId)

        if (!recipe) {
            return new HttpResponse(null, {status: 404})
        }

        return HttpResponse.json(recipe)
    }),

    http.get('https://super-recipes.com/api/recipe/details', async ({ request }) => {
        // Construct a URL instance out of the intercepted request.
        const url = new URL(request.url)

        // Read the "id" URL query parameter using the "URLSearchParams" API.
        // Given "/product?id=1", "productId" will equal "1".
        const recipeId = url.searchParams.get('id')
        if (!recipeId) {
            return new HttpResponse(null, {status: 400})
        }

        const recipe = details.find((recipe) => recipe.id === +recipeId)

        // Note that query parameters are potentially undefined.
        // Make sure to account for that in your handlers.
        if (!recipe) {
            return new HttpResponse(null, { status: 404 })
        }

        return HttpResponse.json(recipe)
    }),

    http.get('https://super-recipes.com/api/recipe/images', async ({ request }) => {
        await delay(3000)
        // Construct a URL instance out of the intercepted request.
        const url = new URL(request.url)

        const recipeId = url.searchParams.get('id')
        if (!recipeId) {
            return new HttpResponse(null, {status: 400})
        }

        const recipeWithImage = images.find((recipe) => recipe.id === +recipeId)

        // Note that query parameters are potentially undefined.
        // Make sure to account for that in your handlers.
        if (!recipeWithImage) {
            return new HttpResponse(null, { status: 404 })
        }

        return HttpResponse.json(recipeWithImage)
    }),
]
