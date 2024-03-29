/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { WeeklyRecurringEventService } from 'app/entities/weekly-recurring-event/weekly-recurring-event.service';
import { IWeeklyRecurringEvent, WeeklyRecurringEvent } from 'app/shared/model/weekly-recurring-event.model';

describe('Service Tests', () => {
    describe('WeeklyRecurringEvent Service', () => {
        let injector: TestBed;
        let service: WeeklyRecurringEventService;
        let httpMock: HttpTestingController;
        let elemDefault: IWeeklyRecurringEvent;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(WeeklyRecurringEventService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new WeeklyRecurringEvent(0, 0, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a WeeklyRecurringEvent', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        start: currentDate,
                        end: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new WeeklyRecurringEvent(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a WeeklyRecurringEvent', async () => {
                const returnedFromService = Object.assign(
                    {
                        dayOfWeek: 1,
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        start: currentDate,
                        end: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of WeeklyRecurringEvent', async () => {
                const returnedFromService = Object.assign(
                    {
                        dayOfWeek: 1,
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        start: currentDate,
                        end: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a WeeklyRecurringEvent', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
