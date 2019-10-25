import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { AlertityService } from '../_services/alertity.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService, private router: Router, private alertify: AlertityService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError((error) => {
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
