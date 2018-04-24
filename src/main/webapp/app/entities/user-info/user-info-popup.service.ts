import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserInfo } from './user-info.model';
import { UserInfoService } from './user-info.service';

@Injectable()
export class UserInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userInfoService: UserInfoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.userInfoService.find(id)
                    .subscribe((userInfoResponse: HttpResponse<UserInfo>) => {
                        const userInfo: UserInfo = userInfoResponse.body;
                        if (userInfo.lastQuoteDate) {
                            userInfo.lastQuoteDate = {
                                year: userInfo.lastQuoteDate.getFullYear(),
                                month: userInfo.lastQuoteDate.getMonth() + 1,
                                day: userInfo.lastQuoteDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.userInfoModalRef(component, userInfo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userInfoModalRef(component, new UserInfo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userInfoModalRef(component: Component, userInfo: UserInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userInfo = userInfo;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
