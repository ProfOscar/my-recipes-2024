import { Component } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: IngredientModel[] = [
    new IngredientModel("Apple", 5),
    new IngredientModel("Tomato", 10)
  ];

  onIngredientAdded(newIngredient: IngredientModel) {
    let ingredientFound = this.ingredients.find(function (item) {
      return item.name.toLowerCase() == newIngredient.name.toLowerCase();
    })
    if (!ingredientFound)
      this.ingredients.push(newIngredient);
    else
      ingredientFound.amount += newIngredient.amount;
  }
}
