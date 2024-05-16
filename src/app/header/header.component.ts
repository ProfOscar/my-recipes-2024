import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeModel } from '../models/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  collapsed: boolean = true;

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  saveData() {
    this.dataStorageService.storeRecipes(this.recipeService.recipes).subscribe({
      next: (data) => {
        console.log(data);
        alert('Recipes saved to Firebase Realtime Database!');
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe({
      next: (data) => {
        console.log(data);
        this.recipeService.recipes = data as RecipeModel[];
        alert('Recipes loaded from Firebase Realtime Database!');
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
