import { toDate } from "./datoUtils";
import {
  getSykmeldingStartdato,
  hentPerioderForSykmelding,
} from "./sykmeldingUtils";

export function sorterPerioderEldsteFoerst(perioder) {
  return perioder.sort((a, b) => {
    if (toDate(a.fom).getTime() !== toDate(b.fom).getTime()) {
      return toDate(a.fom) - toDate(b.fom);
    }
    return toDate(a.tom) - toDate(b.tom);
  });
}

const hentArbeidsgivernavn = (sykmelding) => {
  return sykmelding.mottakendeArbeidsgiver
    ? sykmelding.mottakendeArbeidsgiver.navn
    : sykmelding.arbeidsgiver
    ? sykmelding.arbeidsgiver
    : sykmelding.arbeidsgiverNavn
    ? sykmelding.arbeidsgiverNavn
    : "";
};

export const sorterSykmeldinger = (sykmeldinger = [], kriterium = "fom") => {
  return sykmeldinger
    .map((sykmelding) => {
      return sykmelding.mulighetForArbeid
        ? {
            ...sykmelding,
            mulighetForArbeid: {
              ...sykmelding.mulighetForArbeid,
              perioder: sorterPerioderEldsteFoerst(
                sykmelding.mulighetForArbeid.perioder
              ),
            },
          }
        : {
            ...sykmelding,
            sykmeldingsperioder: sorterPerioderEldsteFoerst(
              sykmelding.sykmeldingsperioder
            ),
          };
    })
    .sort((a, b) => {
      if (
        kriterium === "fom" ||
        hentArbeidsgivernavn(a).trim().toUpperCase() ===
          hentArbeidsgivernavn(b).toUpperCase()
      ) {
        if (
          toDate(getSykmeldingStartdato(a)).getTime() !==
          toDate(getSykmeldingStartdato(b)).getTime()
        ) {
          // Hvis a og b har ulik startdato, sorterer vi etter startdato
          return (
            toDate(getSykmeldingStartdato(b)) -
            toDate(getSykmeldingStartdato(a))
          );
        }
        const perioderA = hentPerioderForSykmelding(a);
        const perioderB = hentPerioderForSykmelding(b);
        const sistePeriodeB = perioderB[perioderB.length - 1];
        const sistePeriodeA = perioderA[perioderA.length - 1];
        return toDate(sistePeriodeB.tom) - toDate(sistePeriodeA.tom);
      }
      return Object.byString(a, kriterium) < Object.byString(b, kriterium)
        ? -1
        : 1;
    });
};
