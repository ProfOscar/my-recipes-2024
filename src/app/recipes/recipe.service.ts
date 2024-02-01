import { Injectable } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { RecipeModel } from '../models/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: RecipeModel[] = [];
  selectedRecipe?: RecipeModel;
  isFirst: boolean = true;

  constructor(private dataStorageService: DataStorageService,
    private shoppingListService: ShoppingListService) { }

  getRecipes(): any {
    this.dataStorageService.inviaRichiesta("get", "/recipes")?.subscribe({
      "next": (data) => {
        this.recipes = data;
        if (this.isFirst) {
          this.selectedRecipe = this.recipes[0];
          this.isFirst = false;
        }
      },
      "error": (error) => {
        console.log(error);
      }
    });
  }

  addIngredientsToShoppingList(ingredients?:IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
