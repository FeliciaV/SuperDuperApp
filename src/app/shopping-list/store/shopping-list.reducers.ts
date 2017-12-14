import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';
import { ADD_INGREDIENT } from './shopping-list.actions';


const initialState = {
    ingredients: [
        new Ingredient('pepper', 5),
        new Ingredient('sugar', 2)
    ]
};

export function shoppingListReducer(state = initialState,
    action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        default:
            return state;
    }

    // return state;
}
