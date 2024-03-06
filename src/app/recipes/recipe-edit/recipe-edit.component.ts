import { Component } from '@angular/core';
import { IngredientModel } from 'src/app/models/ingredient.model';
import { RecipeModel } from 'src/app/models/recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  name: string = "";
  description: string = "";
  imageURL: string = "";
  imageBase64: string = "";
  ingredients: string = "";

  isEdit:boolean = false;

  constructor(private activatedRoute:ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      (params:Params)=>{
        this.isEdit = params["id"]
      }
    )
  }

  onFileSelected(event: any) {

  }

  onSave() {
    let ingredientsArray: IngredientModel[] = this.parseIngredients(this.ingredients);
    // console.log(ingredientsArray);
    let recipe = new RecipeModel(this.name, this.description, this.imageURL, ingredientsArray);
    // ADD
    this.recipeService.addRecipe(recipe)?.subscribe({
      "next": (data: any) => {
        alert("Recipe correctly added!");
        this.recipeService.getRecipes();
        this.router.navigateByUrl("/recipes");
      },
      "error": (err: any) => {
        alert("Problems during recipe saving");
        console.log(err);
      }
    })
  }

  parseIngredients(ingredients: string): IngredientModel[] {
    let retVal: IngredientModel[] = [];
    let ausVet = ingredients.split("\n");
    for (const item of ausVet) {
      if (item) {
        let ausObj = item.split(":");
        retVal.push(new IngredientModel(ausObj[0], parseInt(ausObj[1])));
      }
    }
    return retVal;
  }
}
