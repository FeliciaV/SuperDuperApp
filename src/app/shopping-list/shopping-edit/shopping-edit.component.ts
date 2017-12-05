import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('nameInput') nameInputRef: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAdd() {
    // this.ingredientAdded.emit({
    //   name: nameInput.value,
    //   amount: this.amountInput.nativeElement.value
    // });

    const name = this.nameInputRef.nativeElement.value;
    const am = this.amountInputRef.nativeElement.value;
    const newIngr = new Ingredient(name, am);
    // this.ingredientAdded.emit(newIngr);

    this.slService.addIngredient(newIngr);
  }
}
