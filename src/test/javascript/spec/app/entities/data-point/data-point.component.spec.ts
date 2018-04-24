/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BalancepositionTestModule } from '../../../test.module';
import { DataPointComponent } from '../../../../../../main/webapp/app/entities/data-point/data-point.component';
import { DataPointService } from '../../../../../../main/webapp/app/entities/data-point/data-point.service';
import { DataPoint } from '../../../../../../main/webapp/app/entities/data-point/data-point.model';

describe('Component Tests', () => {

    describe('DataPoint Management Component', () => {
        let comp: DataPointComponent;
        let fixture: ComponentFixture<DataPointComponent>;
        let service: DataPointService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [DataPointComponent],
                providers: [
                    DataPointService
                ]
            })
            .overrideTemplate(DataPointComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataPointComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataPointService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DataPoint(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dataPoints[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
