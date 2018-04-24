/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BalancepositionTestModule } from '../../../test.module';
import { DataPointDetailComponent } from '../../../../../../main/webapp/app/entities/data-point/data-point-detail.component';
import { DataPointService } from '../../../../../../main/webapp/app/entities/data-point/data-point.service';
import { DataPoint } from '../../../../../../main/webapp/app/entities/data-point/data-point.model';

describe('Component Tests', () => {

    describe('DataPoint Management Detail Component', () => {
        let comp: DataPointDetailComponent;
        let fixture: ComponentFixture<DataPointDetailComponent>;
        let service: DataPointService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [DataPointDetailComponent],
                providers: [
                    DataPointService
                ]
            })
            .overrideTemplate(DataPointDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataPointDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataPointService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DataPoint(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dataPoint).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
