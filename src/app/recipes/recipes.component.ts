import { Component } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {

  selectedRecipe!: RecipeModel;

  onRecipeItemSelected(recipe: RecipeModel) {
    this.selectedRecipe = recipe;
  }
}
