import { TEAMS_LOADED } from "./action";
// import _ from "lodash";

const defaultState = {
  teams: []
};

const teamsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TEAMS_LOADED: {
      return { ...state, teams: action.payload.data};
    }

    default:
      return state;
  }
};

export default teamsReducer;