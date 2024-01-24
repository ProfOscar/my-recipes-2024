import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  constructor(public recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipes();
  }

}
