import { Component, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  constructor(public recipeService: RecipeService) { }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeService.selectedRecipe?.ingredients);
  }

}
