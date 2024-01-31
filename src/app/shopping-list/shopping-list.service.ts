import { Injectable } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients: IngredientModel[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  getIngredients(): any {
    this.dataStorageService.inviaRichiesta("get", "/shopping-list")?.subscribe({
      "next": (data) => {
        this.ingredients = data;
      },
      "error": (error) => {
        console.log(error);
      }
    });
  }

  addIngredient(newIngredient: IngredientModel) {
    let ingredientFound = this.ingredients.find(function (item) {
      return item.name.toLowerCase() == newIngredient.name.toLowerCase();
    })
    if (!ingredientFound)
      this.ingredients.push(newIngredient);
    else
      ingredientFound.amount += newIngredient.amount;
  }

  addIngredients(ingredients: IngredientModel[]) {
    for (const item of ingredients) {
      this.addIngredient(item);
    }
  }

}
