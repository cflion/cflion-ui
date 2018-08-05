import {
    ADD_SERVICE,
    REMOVE_SERVICE,
    EDIT_SERVICE,
    CHECK_SERVICE
} from './actionTypes'


export default (state = [], action) => {
    switch (action.type) {
        case ADD_SERVICE: {
            return [
                {
                    id: action.id,
                    service: action.service,
                },
                ...state
            ]
        }
        case REMOVE_SERVICE: {
            let index;
            for (let k = 0; k < state.length; k++) {
                if (state[k].service.id === action.service.id) {
                    index = state.indexOf(state[k]);
                }
            }
            state.splice(index, 1);
            return state;
        }
        case EDIT_SERVICE: {
            return state.map((ele) => {
                if (ele.service.id === action.service.id) {
                    return {
                        ...ele,
                        service: action.service
                    }
                } else {
                    return ele;
                }
            })
        }
        case CHECK_SERVICE: {
            return state.filter((obj) => {
                return obj.service.id === action.id
            })
        }
        default: {
            return state;
        }
    }
}