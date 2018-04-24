/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BalancepositionTestModule } from '../../../test.module';
import { KeyPairDetailComponent } from '../../../../../../main/webapp/app/entities/key-pair/key-pair-detail.component';
import { KeyPairService } from '../../../../../../main/webapp/app/entities/key-pair/key-pair.service';
import { KeyPair } from '../../../../../../main/webapp/app/entities/key-pair/key-pair.model';

describe('Component Tests', () => {

    describe('KeyPair Management Detail Component', () => {
        let comp: KeyPairDetailComponent;
        let fixture: ComponentFixture<KeyPairDetailComponent>;
        let service: KeyPairService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [KeyPairDetailComponent],
                providers: [
                    KeyPairService
                ]
            })
            .overrideTemplate(KeyPairDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeyPairDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeyPairService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new KeyPair(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.keyPair).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
