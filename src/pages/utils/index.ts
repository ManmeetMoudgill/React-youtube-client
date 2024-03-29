export interface State {
  page: number;
}

export enum ActionType {
  SET_PAGE = "SET_PAGE",
}

export type Action = { type: ActionType.SET_PAGE; payload: number };

export const initialState: State = {
  page: 1,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
