import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '../../../js/api/index';
import * as actions from '../../../js/actions/epostinnhold_actions';
import {
    hentBekreftMoteEpostinnhold,
    hentAvbrytMoteEpostinnhold,
} from '../../../js/sagas/epostinnholdSagas';

describe('epostinnholdSagas', () => {
    let action;

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/sykefravaer',
            MOTEADMIN_REST_ROOT: 'http://tjenester.nav.no/moteadmin',
        };
    });

    describe('Epost for bekreftelse av møtetidspunkt', () => {
        action = actions.hentBekreftMoteEpostinnhold('deltakerUuid', 'alternativId');
        const generator = hentBekreftMoteEpostinnhold(action);

        it('Skal dispatche HENTER_EPOSTINNHOLD', () => {
            const nextPut = put({ type: actions.HENTER_EPOSTINNHOLD });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal deretter prøve å hente epostinnhold', () => {
            const nextCall = call(get, 'http://tjenester.nav.no/moteadmin/epostinnhold/BEKREFTET?motedeltakeruuid=deltakerUuid&valgtAlternativId=alternativId');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter si i fra om at epostinnhold er hentet', () => {
            const data = {
                emne: 'Mitt fine emne',
                innhold: 'Mitt flotte innhold',
            };
            const nextPut = put({
                type: actions.EPOSTINNHOLD_HENTET,
                eposttype: 'BEKREFT_TIDSPUNKT',
                data,
            });
            expect(generator.next(data).value).to.deep.equal(nextPut);
        });
    });

    describe('Epost for avbryt møtetidspunkt', () => {
        action = actions.hentAvbrytMoteEpostinnhold('abc123', 'EPOST');
        const generator = hentAvbrytMoteEpostinnhold(action);

        it('Skal dispatche HENTER_EPOSTINNHOLD', () => {
            const nextPut = put({ type: actions.HENTER_EPOSTINNHOLD });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal deretter prøve å hente epostinnhold', () => {
            const nextCall = call(get, 'http://tjenester.nav.no/moteadmin/epostinnhold/AVBRUTT?motedeltakeruuid=abc123');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter si i fra om at epostinnhold er hentet', () => {
            const data = {
                emne: 'Mitt fine emne',
                innhold: 'Mitt flotte innhold',
            };
            const nextPut = put({
                type: actions.EPOSTINNHOLD_HENTET,
                eposttype: 'AVBRYT_TIDSPUNKT',
                data,
            });
            expect(generator.next(data).value).to.deep.equal(nextPut);
        });
    });
});
