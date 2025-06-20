import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobsReducer from '../features/jobs/jobsSlice';
import applicationReducer from '../features/application/applicationSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobsReducer,
        application: applicationReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store; 