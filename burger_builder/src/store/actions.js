// Action Types
export const SET_INGREDIENTS = 'SET_INGREDIENTS'

// 
// Action Creators
// 
export function setIngredients(ingredients) {
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients,
    }
}