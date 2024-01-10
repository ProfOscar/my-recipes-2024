import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<boolean>()

  collapsed: boolean = true;
  isRecipe: boolean = true; // true for recipes; false for shopping-list

  onSelect(feature: string) {
    this.isRecipe = feature == "recipes";
    this.featureSelected.emit(this.isRecipe);
  }
}
