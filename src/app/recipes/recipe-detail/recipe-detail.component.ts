import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @ViewChild(TemplateRef, { static: false }) tpl!: TemplateRef<any>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public recipeService: RecipeService,
    public ngxSmartModalService: NgxSmartModalService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    console.log("RecipeDetailComponent");
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        console.log("Il parametro è: " + params['id']);
        this.recipeService.getRecipe(params['id']);
      }
    )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeService.selectedRecipe?.ingredients);
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
    this.router.navigateByUrl(this.router.url + "/edit");
  }

  askConfirmToDelete() {
    this.ngxSmartModalService.create('deleteConfirmModal', this.tpl, this.viewContainerRef).open();
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeService.selectedRecipe?._id)?.subscribe({
      "next": (data: any) => {
        alert("Recipe " + this.recipeService.selectedRecipe?.name + " correctly deleted!");
        this.recipeService.getRecipes();
        this.router.navigateByUrl("/recipes");
      },
      "error": (err: any) => {
        alert("Problems during recipe delete!");
        console.log(err);
      }
    });
  }

}
