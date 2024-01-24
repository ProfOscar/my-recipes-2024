import { Injectable } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: RecipeModel[] = [];
  selectedRecipe?: RecipeModel;

  constructor(private dataStorageService: DataStorageService) { }

  getRecipes():any {
    this.dataStorageService.inviaRichiesta("get", "/recipes")?.subscribe({
      "next": (data) => {
        this.recipes = data;
        this.selectedRecipe = this.recipes[0];
      },
      "error": (error) => {
        console.log(error);
      }
    });
  }
}
