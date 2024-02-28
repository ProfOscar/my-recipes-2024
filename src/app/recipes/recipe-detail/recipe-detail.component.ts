import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  constructor(private route:ActivatedRoute, public recipeService: RecipeService) { }

  ngOnInit() {
    console.log("RecipeDetailComponent");
    this.route.params.subscribe(
      (params: Params) => {
        console.log("Il parametro è: " + params['id']);
        this.recipeService.getRecipe(params['id']);
      }
    )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeService.selectedRecipe?.ingredients);
  }

}
