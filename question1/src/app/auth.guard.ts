import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(!inject(UserService).isLogged()){
    return createUrlTreeFromSnapshot(route, ['/login']);
  }else{
     return true;
  }
};
