import { Component } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

  constructor(public shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.getIngredients()
  }

  onIngredientClick(item: IngredientModel) {
    this.shoppingListService.selectedIngredient = item;
  }

}
