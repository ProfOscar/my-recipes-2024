import { createMayBeForwardRefExpression } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: IngredientModel[] = [];
  ingredientModified: EventEmitter<string> = new EventEmitter<string>();

  selectedIngredient?: IngredientModel;

  constructor(private dataStorageService: DataStorageService) {}

  getIngredients(): any {
    this.dataStorageService.inviaRichiesta('get', '/shopping-list')?.subscribe({
      next: (data) => {
        this.ingredients = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addIngredient(newIngredient: IngredientModel) {
    let ingredientFound = this.ingredients.find(function (item) {
      return item.name.toLowerCase() == newIngredient.name.toLowerCase();
    });
    if (!ingredientFound) {
      this.ingredients.push(newIngredient);
      this.postIngredient(newIngredient);
    } else {
      ingredientFound.amount += newIngredient.amount;
      let data: any = { amount: ingredientFound.amount };
      this.putIngredient(ingredientFound._id, data);
    }
  }

  addIngredients(ingredients?: IngredientModel[]) {
    ingredients?.forEach(element => {
      this.addIngredient(element);
    });
  }

  postIngredient(ingredient: IngredientModel) {
    this.dataStorageService
      .inviaRichiesta('post', '/shopping-list', ingredient)
      ?.subscribe({
        next: (data) => {
          console.log(data);
          // alert("Ingredient succesfully added!");
          this.ingredientModified.emit('Ingredient successfully added!');
          this.getIngredients();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  putIngredient(id?: string, data?: any) {
    this.dataStorageService
      .inviaRichiesta('put', '/shopping-list/' + id, data)
      ?.subscribe({
        next: (data) => {
          console.log(data);
          //alert('Ingredient successfully modified!');
          this.ingredientModified.emit('Ingredient successfully modified!');
          this.getIngredients();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  deleteIngredient(selectedIngredient: IngredientModel) {
    this.dataStorageService
      .inviaRichiesta('delete', '/shopping-list/' + selectedIngredient._id)
      ?.subscribe({
        next: (data) => {
          console.log(data);
          this.ingredientModified.emit('Ingredient successfully deleted!');
          this.getIngredients();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

}
