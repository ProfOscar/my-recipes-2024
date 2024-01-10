import { Component, EventEmitter, Output } from '@angular/core';
import { IngredientModel } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @Output() ingredientAdded = new EventEmitter<IngredientModel>();

  ingredientName: string = "";
  ingredientAmount: number = 0;

  onAddIngredient() {
    if (this.ingredientAmount <= 0) {
      alert("Amount should be positive");
    } else {
      const newIngredient: IngredientModel = new IngredientModel(this.ingredientName, this.ingredientAmount);
      this.ingredientAdded.emit(newIngredient);
      this.onClear();
    }
  }

  onClear() {
    this.ingredientName = "";
    this.ingredientAmount = 0;
  }

}
