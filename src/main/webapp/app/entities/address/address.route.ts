import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Address } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { AddressComponent } from './address.component';
import { AddressDetailComponent } from './address-detail.component';
import { AddressUpdateComponent } from './address-update.component';
import { AddressDeletePopupComponent } from './address-delete-dialog.component';
import { IAddress } from 'app/shared/model/address.model';

@Injectable({ providedIn: 'root' })
export class AddressResolve implements Resolve<IAddress> {
    constructor(private service: AddressService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Address> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Address>) => response.ok),
                map((address: HttpResponse<Address>) => address.body)
            );
        }
        return of(new Address());
    }
}

export const addressRoute: Routes = [
    {
        path: 'address',
        component: AddressComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address/:id/view',
        component: AddressDetailComponent,
        resolve: {
            address: AddressResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address/new',
        component: AddressUpdateComponent,
        resolve: {
            address: AddressResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address/:id/edit',
        component: AddressUpdateComponent,
        resolve: {
            address: AddressResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressPopupRoute: Routes = [
    {
        path: 'address/:id/delete',
        component: AddressDeletePopupComponent,
        resolve: {
            address: AddressResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eventsApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
