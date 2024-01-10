import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe!:RecipeModel;
  @Output() recipeItemSelected = new EventEmitter<void>();

  onSelected(){
    this.recipeItemSelected.emit();
  }
}
