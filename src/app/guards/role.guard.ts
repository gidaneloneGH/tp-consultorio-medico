import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RolUsuario } from '../shared/enum/rol-usuario.enum';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  
  const router = inject(Router);
  const authService = inject(AuthService);

  const rolesPermitidos = route.data['roles'] as RolUsuario[];
  
  if (!rolesPermitidos || rolesPermitidos.length === 0) {
    return true; 
  }

  const rolUsuario = authService.getRolUsuario(); 

  const isAuthorized = rolesPermitidos.includes(rolUsuario as RolUsuario);

  if (isAuthorized) {
    return true;
  } else {
    router.navigate(['/home']); 
    return false;
  }
};