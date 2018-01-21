import {} from '../constants'

const initialState = []

export const graf = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_CATEGORY_CHANGES':{
      return (
          state
      )
    }
  break;
  default:
    return state
    break
  }
}
