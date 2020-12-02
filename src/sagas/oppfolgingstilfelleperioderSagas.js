import { call, put, fork, takeEvery, select } from "redux-saga/effects";
import { log } from "@navikt/digisyfo-npm";
import { get } from "../api";
import * as actions from "../actions/oppfolgingstilfelleperioder_actions";

export function* hentOppfolgingstilfelleperioder(action, orgnummer) {
  yield put(actions.hentOppfolgingstilfelleperioderHenter(orgnummer));
  try {
    const path = `${process.env.REACT_APP_REST_ROOT}/internad/oppfolgingstilfelleperioder?fnr=${action.fnr}&orgnummer=${orgnummer}`;
    const data = yield call(get, path);
    yield put(actions.hentOppfolgingstilfelleperioderHentet(data, orgnummer));
  } catch (e) {
    log(e);
    yield put(actions.hentOppfolgingstilfelleperioderFeilet(orgnummer));
  }
}

export const hentLedereVirksomhetsnummerList = (ledere) => {
  const erLedereHentet = ledere.hentet;
  if (erLedereHentet) {
    return ledere.data.map((leder) => {
      return leder.orgnummer;
    });
  }
  return [];
};

export const hentSykmeldingerVirksomhetsnummerList = (sykmeldinger) => {
  const erSykmeldingerHentet = sykmeldinger.hentet;
  if (erSykmeldingerHentet) {
    return sykmeldinger.data
      .filter((sykmelding) => {
        return sykmelding.mottakendeArbeidsgiver;
      })
      .map((sykmelding) => {
        return sykmelding.mottakendeArbeidsgiver.virksomhetsnummer;
      });
  }
  return [];
};

export const hentVirksomhetsnummerList = (state) => {
  const ledereVirksomhetNrList = hentLedereVirksomhetsnummerList(state.ledere);
  const sykmeldingerVirksomhetsNrList = hentSykmeldingerVirksomhetsnummerList(
    state.sykmeldinger
  );
  return [
    ...new Set([...sykmeldingerVirksomhetsNrList, ...ledereVirksomhetNrList]),
  ];
};

export const skalHenteOppfolgingstilfelleperioder = (state, orgnummer) => {
  const reducer = state.oppfolgingstilfelleperioder[orgnummer] || {};
  return (!reducer.henter && !reducer.hentingForsokt) || false;
};

export function* hentOppfolgingstilfelleperioderHvisIkkeHentet(action) {
  const virksomhetsNrList = yield select(hentVirksomhetsnummerList);
  for (let i = 0; i < virksomhetsNrList.length; i++) {
    const skalHente = yield select(
      skalHenteOppfolgingstilfelleperioder,
      virksomhetsNrList[i]
    );
    if (skalHente) {
      yield call(hentOppfolgingstilfelleperioder, action, virksomhetsNrList[i]);
    }
  }
}

function* watchHentOppfolgingstilfelleperioder() {
  yield takeEvery(
    actions.HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT,
    hentOppfolgingstilfelleperioderHvisIkkeHentet
  );
}

export default function* oppfolgingstilfelleperioderSagas() {
  yield fork(watchHentOppfolgingstilfelleperioder);
}
