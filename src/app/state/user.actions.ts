import { createActionGroup, props } from '@ngrx/store';
import { User } from './model/model';

export const UsersActions = createActionGroup({
  // group source or namespace
  source: 'Users/API',

  events: {
    // get user by userId
    'Get User': props<{ userId: number }>(),
    'Get User Success': props<User>(),
    // Fail response
    'Get User Failed': props<{ message: string }>(),

    'Get Users List': props<{ page?: number }>(),

    'Get Users List Success': props<{
      users: User[];
      totalUsers: number;
      page: number;
      totalPages: number;
      totalUsersPerPage: number;
    }>(),

    'Get Users List Failed': props<{ message: string }>(),
  },
});
