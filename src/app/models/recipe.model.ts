import { IngredientModel } from "./ingredient.model";

export class RecipeModel {
    public _id?: string;
    public name: string;
    public descritpion: string;
    public imagePath: string;
    public ingredients: IngredientModel[];

    constructor(n: string, d: string, img: string, ing: IngredientModel[]) {
        this.name = n;
        this.descritpion = d;
        this.imagePath = img;
        this.ingredients = ing;
    }
}