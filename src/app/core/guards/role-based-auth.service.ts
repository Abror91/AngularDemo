import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
@Injectable()
export class RoleBasedAuthGuard implements CanActivate {
    constructor(private _authService: AuthService,
        private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        //this will be passed from route config 
        //on the data property
        const expectedRole = route.data.expectedRole;
        const token = this._authService.getToken();
        if (!token)
            return false;
        const decoded = this._authService.GetDecodedAccessToken(token);
        if (!decoded)
            return false;
        if (this._authService.isTokenExpired() || decoded.role !== expectedRole){
            this.router.navigate(['/login'])
            return false;
        }
        else
            return true;
    }
}