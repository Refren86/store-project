import { AnyAction } from "redux";

// Matchable is based on the concept that function is an Object, to which we can attach
// specific methods! E.g: myFunc.method = () => do something; myFunc.method() will run this method
// Matchable is useful as an extension for action creators!

// AC = generic action creator
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type']; // extracting the type field from action object
  match(action: AnyAction): action is ReturnType<AC> // narrows the type and comparing the actions in AC and reducer
}

// for action creators with no parameters
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// for action creators with unlimited amount of parameters (payloads, errors etc) with "any" type
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// to check whether received action from action creator match the action inside reducer!
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type; // extracting type from action creator object
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) { // this action will come from reducer!
      return action.type === type;
    }
  })
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// This is functional overloading in case there are action with types or types and payload (all of them can receive own types because of generics)
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void // void means that I don't expect anything here
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

// export const createAction = (type, payload) => ({ type, payload });
