import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IngredientModel } from 'src/app/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild("txtName") _txtName!: ElementRef;

  ingredientName: string = "";
  ingredientAmount: number = 0;

  showIngredientLabel: boolean = false;
  ingredientLabel: string = "";

  constructor(public shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.ingredientModified.subscribe((param: string) => {
      this.showIngredientLabel = true;
      this.ingredientLabel = param;
      setTimeout(() => {
        this.showIngredientLabel = false;
      }, 3000);
    });
  }

  onAddIngredient() {
    if (this.ingredientAmount <= 0) {
      alert("Amount should be positive");
    } else {
      const newIngredient: IngredientModel = new IngredientModel(this.ingredientName, this.ingredientAmount);
      this.shoppingListService.addIngredient(newIngredient);
      this.onClear();
    }
  }

  onDeleteIngredient() {
    if (this.shoppingListService.selectedIngredient != undefined) {
      this.shoppingListService.deleteIngredient(this.shoppingListService.selectedIngredient);
      this.shoppingListService.selectedIngredient = undefined;
    }
  }

  onClear() {
    this.ingredientName = "";
    this.ingredientAmount = 0;
    this._txtName.nativeElement.focus();
    this.shoppingListService.selectedIngredient = undefined;
  }

}
