import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode= false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @ViewChild('nameInput') nameInputRef: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    // this.ingredientAdded.emit({
    //   name: nameInput.value,
    //   amount: this.amountInput.nativeElement.value
    // });

    // const name = this.nameInputRef.nativeElement.value;
    // const am = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngr = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngr);

    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngr);
    } else {
      this.slService.addIngredient(newIngr);
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }
}
