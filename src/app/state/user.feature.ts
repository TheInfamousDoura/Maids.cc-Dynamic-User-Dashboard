import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersActions } from './user.actions';
import { User } from './model/model';

export const adapter = createEntityAdapter<User>();

export interface State extends EntityState<User> {
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalUsers: number;
  totalUsersPerPage: number;
}

const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  page: 0,
  totalUsers: 0,
  totalPages: 0,
  totalUsersPerPage: 0,
});

export const UsersFeature = createFeature({
  name: 'users',

  reducer: createReducer(
    initialState,
    on(UsersActions.getUser, (state, _action) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(UsersActions.getUserSuccess, (state, action) =>
      adapter.setOne(action, {
        ...state,
        loading: false,
        error: null,
      })
    ),

    on(UsersActions.getUserFailed, (_state, action) => ({
      ..._state,
      loading: false,
      error: action.message,
    })),

    on(UsersActions.getUsersList, (state, _action) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(UsersActions.getUsersListSuccess, (state, action) =>
      adapter.setAll(action.users, {
        ...state,
        loading: false,
        error: null,
        totalUsers: action.totalUsers,
        page: action.page,
        totalPages: action.totalPages,
        totalUsersPerPage: action.totalUsersPerPage,
      })
    ),

    on(UsersActions.getUsersListFailed, (state, action) => ({
      ...state,
      loading: false,
      error: action.message,
    }))
  ),
});
