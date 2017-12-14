import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode= false;
  // editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @ViewChild('nameInput') nameInputRef: ElementRef;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.slForm.setValue({
                       name: this.editedItem.name,
                       amount: this.editedItem.amount
                     });
            console.log(this.editedItem);
          } else {
            this.editMode = false;
          }
        }
      );
    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       });
    //     }
    //   );
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
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
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({newIng: newIngr }));
      // this.slService.updateIngredient(this.editedItemIndex, newIngr);
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngr));
      // this.slService.addIngredient(newIngr);
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
    // his.slService.deleteIngredient(this.editedItemIndex);
  }
}
