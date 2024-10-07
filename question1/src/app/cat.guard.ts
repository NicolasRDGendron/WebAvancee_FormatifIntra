import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';

export const catGuard: CanActivateFn = (route, state) => {
  if (!inject(UserService).likesCats()) {
    return createUrlTreeFromSnapshot(route, ['/dog']);
  } else {
    return true;
  }
};
