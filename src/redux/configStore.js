import { applyMiddleware, combineReducers, createStore } from 'redux';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer'
import reduxThunk from 'redux-thunk'
import LoadingReducer from './reducers/LoadingReducer';
import { ModalReducer } from './reducers/ModalReducer';

//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { UserLoginCyberBugsReducer } from './reducers/UserCyberBugsReducer';
import { rootSaga } from './sagas/rootSaga';
import { ProjectCyberBugsReducer } from './reducers/ProjectCyberBugsReducer';
import { drawerReducer } from './reducers/DrawerCyberbugs';
import { ProjectReducer } from './reducers/ProjectReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { TaskReducer } from './reducers/TaskReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    ModalReducer,
    UserLoginCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    drawerReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer

})
const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));
middleWareSaga.run(rootSaga);

export default store;

