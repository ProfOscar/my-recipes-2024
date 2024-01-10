import { Component, EventEmitter, Output } from '@angular/core';
import { IngredientModel } from 'src/app/models/ingredient.model';
import { RecipeModel } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeItemSelected = new EventEmitter<RecipeModel>();

  recipes: RecipeModel[] = [
    new RecipeModel(
      "Spaghetti alla chitarra",
      "Un particolare tipo di pasta che...",
      "https://images.lacucinaitaliana.it/wp-content/uploads/2017/02/Maccheroni-alla-chitarra.jpg",
      [new IngredientModel('Apple',
        5), new IngredientModel('Tomato',
          10)
      ]),
    new RecipeModel(
      "Lasagne alla bolognese",
      "Pasta calorica emiliana...",
      "https://www.cucinare.it/uploads/wp-content/uploads/2015/05/pasta_alla_bolognese.webp",
      [new IngredientModel('Apple',
        6), new IngredientModel('Tomato',
          11)
      ]),
    new RecipeModel(
      "Gnocchi ai formaggi",
      "ottimi soprattutto in montagna...",
      "https://images.fidhouse.com/fidelitynews/wp-content/uploads/sites/6/2017/05/1495792337_13c855513b63705bb079c377ed01563d4eb12ccc-223759579.jpg?w=580",
      [new IngredientModel('Apple',
        7), new IngredientModel('Tomato',
          12)
      ]),
    new RecipeModel(
      "Tiramisu",
      "con panna e mascarcope...",
      "https://blog.giallozafferano.it/acasadimaria/wp-content/uploads/2019/06/tiramisu-sav.png",
      [new IngredientModel('Apple',
        8), new IngredientModel('Tomato',
          13)
      ])
  ];

  selectedRecipe: RecipeModel;

  constructor() {
    this.selectedRecipe = this.recipes[0];
  }

  ngOnInit() {
    this.recipeItemSelected.emit(this.selectedRecipe);
  }

  onRecipeItemSelected(recipe: RecipeModel) {
    this.recipeItemSelected.emit(recipe);
  }
}
