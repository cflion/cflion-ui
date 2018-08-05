import {
    ADD_SERVICE,
    REMOVE_SERVICE,
    EDIT_SERVICE,
    CHECK_SERVICE
} from './actionTypes'


let serviceCount = 0;

export const addService = (service) => ({
    type: ADD_SERVICE,
    id: serviceCount++,
    service: service
});

export const removeService = (service) => ({
    type: REMOVE_SERVICE,
    service: service,
});

export const editService = (service) => ({
    type: EDIT_SERVICE,
    service: service,
});

export const checkService = (id) => ({
    type: CHECK_SERVICE,
    id: id
});
