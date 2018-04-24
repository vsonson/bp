/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BalancepositionTestModule } from '../../../test.module';
import { KeyPairComponent } from '../../../../../../main/webapp/app/entities/key-pair/key-pair.component';
import { KeyPairService } from '../../../../../../main/webapp/app/entities/key-pair/key-pair.service';
import { KeyPair } from '../../../../../../main/webapp/app/entities/key-pair/key-pair.model';

describe('Component Tests', () => {

    describe('KeyPair Management Component', () => {
        let comp: KeyPairComponent;
        let fixture: ComponentFixture<KeyPairComponent>;
        let service: KeyPairService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BalancepositionTestModule],
                declarations: [KeyPairComponent],
                providers: [
                    KeyPairService
                ]
            })
            .overrideTemplate(KeyPairComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeyPairComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeyPairService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new KeyPair(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.keyPairs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
