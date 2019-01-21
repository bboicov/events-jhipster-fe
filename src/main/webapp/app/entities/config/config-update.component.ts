import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IConfig } from 'app/shared/model/config.model';
import { ConfigService } from './config.service';

@Component({
    selector: 'jhi-config-update',
    templateUrl: './config-update.component.html'
})
export class ConfigUpdateComponent implements OnInit {
    config: IConfig;
    isSaving: boolean;

    constructor(protected configService: ConfigService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ config }) => {
            this.config = config;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.config.id !== undefined) {
            this.subscribeToSaveResponse(this.configService.update(this.config));
        } else {
            this.subscribeToSaveResponse(this.configService.create(this.config));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IConfig>>) {
        result.subscribe((res: HttpResponse<IConfig>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
