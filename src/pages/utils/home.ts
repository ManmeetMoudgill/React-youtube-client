export interface State {
  page: number;
  category: string;
}

export enum ActionType {
  SET_PAGE = "SET_PAGE",
  SET_CATEGORY = "SET_CATEGORY",
}

export type Action =
  | { type: ActionType.SET_PAGE; payload: number }
  | { type: ActionType.SET_CATEGORY; payload: string };

export const initialState: State = {
  page: 1,
  category: "",
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};
