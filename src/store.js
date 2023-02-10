import { configureStore } from '@reduxjs/toolkit'

const initialState = {
    videoTime: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIDEO_TIME':
            console.log('update time')
            return { ...state, videoTime: action.time };
        default:
            return state;
    }
};

export default configureStore({
    reducer: reducer
});


