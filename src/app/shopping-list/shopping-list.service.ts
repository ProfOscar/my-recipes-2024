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

  constructor(private dataStorageService: DataStorageService) { }

  async getIngredients() {
    this.ingredients = await this.dataStorageService.inviaRichiesta('get', '/shopping-list')
      .catch(error => { console.log(error); });
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
      this.patchIngredient(ingredientFound._id, data);
    }
  }

  addIngredients(ingredients?: IngredientModel[]) {
    ingredients?.forEach(element => {
      this.addIngredient(element);
    });
  }

  postIngredient(ingredient: IngredientModel) {
    this.dataStorageService.inviaRichiesta("post", "/shopping-list", ingredient)
      .then(data => {
        this.ingredientModified.emit('Ingredient successfully added!');
        this.getIngredients();
      })
      .catch(error => {
        console.log(error);
      });
  }

  patchIngredient(id?: string, data?: any) {
    this.dataStorageService
      .inviaRichiesta('patch', '/shopping-list/' + id, data)
      .then(data => {
        this.ingredientModified.emit('Ingredient successfully modified!');
        this.getIngredients();
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteIngredient(selectedIngredient: IngredientModel) {
    this.dataStorageService
      .inviaRichiesta('delete', '/shopping-list/' + selectedIngredient._id)
      .then(data => {
        this.ingredientModified.emit('Ingredient successfully deleted!');
        this.getIngredients();
      })
      .catch(error => {
        console.log(error);
      });
  }

}
