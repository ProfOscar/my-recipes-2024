import { Injectable } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { RecipeModel } from '../models/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { DataStorageService } from '../shared/data-storage.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: RecipeModel[] = [];
  selectedRecipe?: RecipeModel;
  isFirst: boolean = true;

  constructor(private dataStorageService: DataStorageService,
    private shoppingListService: ShoppingListService) { }

  async getRecipes() {
    this.recipes = await this.dataStorageService.inviaRichiesta("get", "/recipes")
      .catch(error => { console.log(error); });
    if (this.isFirst) {
      this.shoppingListService.getIngredients();
      this.selectedRecipe = this.recipes[0];
      this.isFirst = false;
    }
  }

  async getRecipe(id: string) {
    this.selectedRecipe = await this.dataStorageService.inviaRichiesta("get", '/recipes/' + id)
      .catch(error => { console.log(error); });
  }

  addIngredientsToShoppingList(ingredients?: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: any) {
    return from(this.dataStorageService.inviaRichiesta("post", "/recipes", recipe));
  }

  patchRecipe(_id: string | undefined, recipe: RecipeModel) {
    return from(this.dataStorageService.inviaRichiesta("patch", `/recipes/${_id}`, recipe));
  }

  deleteRecipe(_id: string | undefined) {
    return from(this.dataStorageService.inviaRichiesta("delete", `/recipes/${_id}`));
  }
  
}
