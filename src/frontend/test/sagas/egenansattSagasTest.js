import { expect } from 'chai';
import { hentEgenansattSaga } from '../../js/sagas/egenansattSagas.js';
import { get } from '../../js/api/index';
import { put, call } from 'redux-saga/effects';
import * as actiontyper from '../../js/actions/actiontyper';

describe('egenansattSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no',
        };
    });

    const generator = hentEgenansattSaga({
        fnr: '1',
    });

    it('Skal dispatche HENTER_EGENANSATT', () => {
        const nextPut = put({
            type: actiontyper.HENTER_EGENANSATT,
        });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest kalle resttjenesten', () => {
        const nextCall = call(get, `${window.APP_SETTINGS.REST_ROOT}/egenansatt/1`);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette EGENANSATT_HENTET', () => {
        const nextPut = put({
            type: actiontyper.EGENANSATT_HENTET,
            data: 'mine data',
        });
        expect(generator.next('mine data').value).to.deep.equal(nextPut);
    });
});