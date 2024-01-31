import { createMayBeForwardRefExpression } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients: IngredientModel[] = [];
  ingredientAdded: EventEmitter<string> = new EventEmitter<string>();

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
    if (!ingredientFound) {
      this.ingredients.push(newIngredient);
      this.postIngredient(newIngredient);
    }
    else {
      ingredientFound.amount += newIngredient.amount;
      let data: any = { "$set": { "amount": ingredientFound.amount } };
      this.patchIngredient(ingredientFound._id, data);
    }
  }

  addIngredients(ingredients: IngredientModel[]) {
    for (const item of ingredients) {
      this.addIngredient(item);
    }
  }

  postIngredient(ingredient: IngredientModel) {
    this.dataStorageService.inviaRichiesta("post", "/shopping-list", ingredient)?.subscribe({
      "next": (data) => {
        console.log(data);
        // alert("Ingredient succesfully added!");
        this.ingredientAdded.emit("Ingredient succesfully added!");
      },
      "error": (error: any) => {
        console.log(error);
      }
    })
  }

  patchIngredient(id?: string, data?: any) {
    this.dataStorageService.inviaRichiesta("patch", "/shopping-list/" + id, data)?.subscribe({
      "next": (data) => {
        console.log(data);
        alert("Ingredient succesfully modified!");
      },
      "error": (error: any) => {
        console.log(error);
      }
    })
  }

}
