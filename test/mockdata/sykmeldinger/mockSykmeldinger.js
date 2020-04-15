const mockSykmeldinger = [
    {
        id: 'e425a750-7f39-4974-9a06-fa1775f987c9',
        mottattTidspunkt: '2020-01-21T23:00:00Z',
        behandlingsutfall: {
            status: 'OK',
            ruleHits: [{
                messageForSender: 'messageForSender',
                messageForUser: 'messageForUser',
                ruleName: 'Rule',
                ruleStatus: null,
            }],
        },
        legekontorOrgnummer: null,
        arbeidsgiver: null,
        sykmeldingsperioder: [
            {
                fom: '2020-01-22',
                tom: '2020-05-22',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'AKTIVITET_IKKE_MULIG',
                aktivitetIkkeMulig: null,
            },
        ],
        sykmeldingStatus: {
            statusEvent: 'SENDT',
            timestamp: '2020-01-29T09:38:05.414834Z',
            arbeidsgiver: {
                orgnummer: '110110110',
                juridiskOrgnummer: '110110110',
                orgNavn: 'PONTYPANDY FIRE SERVICE'
            },
            sporsmalOgSvarListe: null,
        },
        medisinskVurdering: {
            hovedDiagnose: null,
            biDiagnoser: [],
            svangerskap: null,
            yrkesskade: null,
            yrkesskadeDato: null,
            annenFraversArsak: null,
        },
        skjermesForPasient: false,
        prognose: null,
        utdypendeOpplysninger: {},
        tiltakArbeidsplassen: null,
        tiltakNAV: null,
        andreTiltak: null,
        meldingTilNAV: null,
        meldingTilArbeidsgiver: null,
        kontaktMedPasient: {
            kontaktDato: null,
            begrunnelseIkkeKontakt: null,
        },
        behandletTidspunkt: '2020-01-21T22:00:00Z',
        behandler: {
            fornavn: 'Lego',
            mellomnavn: null,
            etternavn: 'Legesen',
            aktoerId: '1000014797129',
            fnr: '99900011122',
            hpr: null,
            her: null,
            adresse: {
                gate: null,
                postnummer: null,
                kommune: null,
                postboks: null,
                land: null,
            },
            tlf: null,
        },
        syketilfelleStartDato: null,
        navnFastlege: null,
        egenmeldt: null,
        papirsykmelding: null,
        harRedusertArbeidsgiverperiode: null,
    },
];

export default mockSykmeldinger;