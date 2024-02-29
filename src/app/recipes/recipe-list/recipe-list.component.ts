import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  constructor(private router: Router, public recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipes();
  }

  onNewRecipe() {
    // this.router.navigate(['/recipes', 'new']);
    this.router.navigateByUrl('/recipes/new');
  }

}
