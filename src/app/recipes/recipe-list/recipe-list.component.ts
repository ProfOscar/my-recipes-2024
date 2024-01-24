import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeItemSelected = new EventEmitter<RecipeModel>();

  recipes: RecipeModel[] = [];

  selectedRecipe?: RecipeModel;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.inviaRichiesta("get", "/recipes")?.subscribe({
      "next": (data) => {
        this.recipes = data;
        this.selectedRecipe = this.recipes[0];
        this.recipeItemSelected.emit(this.selectedRecipe);
      },
      "error": (error) => {
        console.log(error);
      }
    });




  }

  onRecipeItemSelected(recipe: RecipeModel) {
    this.recipeItemSelected.emit(recipe);
  }
}
