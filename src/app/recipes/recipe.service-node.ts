import { Injectable } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { RecipeModel } from '../models/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceNode {

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
          this.shoppingListService.getIngredients();
          this.selectedRecipe = this.recipes[0];
          this.isFirst = false;
        }
      },
      "error": (error) => {
        console.log(error);
      }
    });
  }

  getRecipe(id: string) {
    this.dataStorageService.inviaRichiesta('get', '/recipes/' + id)?.subscribe({
      "next": (data: any) => {
        console.log(data);
        this.selectedRecipe = data;
      },
      "error": (error: any) => {
        console.log(error);
      }
    });
  }

  addIngredientsToShoppingList(ingredients?: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: RecipeModel) {
    return this.dataStorageService.inviaRichiesta("post", "/recipes", recipe);
  }

  patchRecipe(_id: string | undefined, recipe: RecipeModel) {
    // nel crud server PUT e PATCH hanno logiche diverse
    // in questo caso usare la PUT
    return this.dataStorageService.inviaRichiesta("put", `/recipes/${_id}`, recipe);
  }

  deleteRecipe(_id: string | undefined) {
    return this.dataStorageService.inviaRichiesta("delete", `/recipes/${_id}`);
  }
}
