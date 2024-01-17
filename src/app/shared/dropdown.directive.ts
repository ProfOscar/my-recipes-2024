import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  @HostBinding('class.open') isOpen:boolean = false;
  
  // @HostListener('click') toggleOpen(event:Event){
  //   this.isOpen = !this.isOpen;
  // };
  
  @HostListener('document:click', ['$event']) toggleOpen(event:Event){
    if (this.myRef.nativeElement.contains(event.target))
      this.isOpen = !this.isOpen;
    else
      this.isOpen = false;
  }

  constructor(private myRef: ElementRef) { }

}
