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
  imageBase64: string | undefined = "";
  ingredients: string = "";

  isEdit: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.isEdit = params["id"]
      }
    )
    if (this.isEdit && this.recipeService.selectedRecipe) {
      this.name = this.recipeService.selectedRecipe.name;
      this.description = this.recipeService.selectedRecipe.description;
      this.imageURL = this.recipeService.selectedRecipe.imagePath;
      this.ingredients = this.serializeIngredients(this.recipeService.selectedRecipe.ingredients);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageBase64 = reader.result?.toString();
      }
    }
  }

  onSave() {
    let img = this.imageURL || this.imageBase64 || "";
    let ingredientsArray: IngredientModel[] = this.parseIngredients(this.ingredients);
    // console.log(ingredientsArray);
    let recipe = new RecipeModel(this.name, this.description, img, ingredientsArray);
    if (this.isEdit) {
      // EDIT
      let id: string | undefined = this.recipeService.selectedRecipe?._id;
      this.recipeService.patchRecipe(id, recipe)?.subscribe({
        "next": (data: any) => {
          alert(`Recipe ${id} correctly modified!`);
          this.recipeService.getRecipes();
          this.router.navigateByUrl("/recipes/" + id);
        },
        "error": (err: any) => {
          alert("Problems during recipe edit!");
          console.log(err);
        }
      });
    } else {
      // ADD
      this.recipeService.addRecipe(recipe)?.subscribe({
        "next": (data: any) => {
          alert("Recipe correctly added!");
          this.recipeService.getRecipes();
          this.router.navigateByUrl("/recipes");
        },
        "error": (err: any) => {
          alert("Problems during recipe saving!");
          console.log(err);
        }
      });
    }
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

  serializeIngredients(ingredients: IngredientModel[]): string {
    let retVal: string = "";
    for (const ingredient of ingredients) {
      retVal += `${ingredient.name}:${ingredient.amount}\n`;
    }
    return retVal;
  }
}
