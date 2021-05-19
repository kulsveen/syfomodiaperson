import { mount } from "enzyme";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import AvlysDialogmoteSkjema from "../../src/components/dialogmote/avlys/AvlysDialogmoteSkjema";
import configureStore from "redux-mock-store";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";
import { expect } from "chai";
import {
  DialogmoteDTO,
  DialogmoteStatus,
} from "../../src/data/dialogmote/dialogmoteTypes";
import { Feilmelding } from "nav-frontend-typografi";
import { Feiloppsummering } from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";

const realState = createStore(rootReducer).getState();
const store = configureStore([]);
const moteUuid = "123abc";
const mote: DialogmoteDTO = {
  arbeidsgiver: {
    virksomhetsnummer: "912345678",
    type: "ARBEIDSGIVER",
  },
  arbeidstaker: {
    personIdent: "05087321470",
    varselList: [],
    type: "ARBEIDSTAKER",
  },
  createdAt: "",
  opprettetAv: "",
  status: DialogmoteStatus.INNKALT,
  tildeltEnhet: "",
  tildeltVeilederIdent: "",
  updatedAt: "",
  uuid: moteUuid,
  tid: "2021-05-10T09:00:00.000",
  sted: "Videomøte",
};

describe("AvlysDialogmoteSkjemaTest", () => {
  it("viser møtetidspunkt", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/sykefravaer/05087321470/dialogmote/123abc/avlys"]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote/:dialogmoteUuid/avlys">
          <Provider store={store({ ...realState })}>
            <AvlysDialogmoteSkjema dialogmote={mote} />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    expect(wrapper.text()).to.contain("Gjelder dialogmøtet");
    expect(wrapper.text()).to.contain("Mandag 10. mai 2021 kl. 09.00");
  });
  it("validerer begrunnelser", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/sykefravaer/05087321470/dialogmote/123abc/avlys"]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote/:dialogmoteUuid/avlys">
          <Provider store={store({ ...realState })}>
            <AvlysDialogmoteSkjema dialogmote={mote} />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    wrapper.find("form").simulate("submit");

    // Feilmeldinger i skjema
    const feilmeldinger = wrapper.find(Feilmelding);
    expect(
      feilmeldinger.someWhere(
        (feil) =>
          feil.text() === "Vennligst angi begrunnelse til arbeidstakeren"
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) =>
          feil.text() === "Vennligst angi begrunnelse til nærmeste leder"
      )
    ).to.be.true;

    // Feilmeldinger i oppsummering
    const feiloppsummering = wrapper.find(Feiloppsummering);
    expect(feiloppsummering.text()).to.contain(
      "For å gå videre må du rette opp følgende:"
    );
    expect(feiloppsummering.text()).to.contain(
      "Vennligst angi begrunnelse til arbeidstakeren"
    );
    expect(feiloppsummering.text()).to.contain(
      "Vennligst angi begrunnelse til nærmeste leder"
    );
  });
  it("valideringsmeldinger forsvinner ved utbedring", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/sykefravaer/05087321470/dialogmote/123abc/avlys"]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote/:dialogmoteUuid/avlys">
          <Provider store={store({ ...realState })}>
            <AvlysDialogmoteSkjema dialogmote={mote} />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    wrapper.find("form").simulate("submit");

    // Feilmeldinger i skjema
    const feilmeldinger = wrapper.find(Feilmelding);
    expect(
      feilmeldinger.someWhere(
        (feil) =>
          feil.text() === "Vennligst angi begrunnelse til arbeidstakeren"
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) =>
          feil.text() === "Vennligst angi begrunnelse til nærmeste leder"
      )
    ).to.be.true;

    // Feilmeldinger i oppsummering
    const feiloppsummering = wrapper.find(Feiloppsummering);
    expect(feiloppsummering.text()).to.contain(
      "For å gå videre må du rette opp følgende:"
    );
    expect(feiloppsummering.text()).to.contain(
      "Vennligst angi begrunnelse til arbeidstakeren"
    );
    expect(feiloppsummering.text()).to.contain(
      "Vennligst angi begrunnelse til nærmeste leder"
    );

    // Angi begrunnelser
    const textAreas = wrapper.find("textarea");
    textAreas
      .findWhere((w) => w.prop("name") === "begrunnelseArbeidsgiver")
      .simulate("change", { target: { value: "Noe tekst til arbeidsgiver" } });
    textAreas
      .findWhere((w) => w.prop("name") === "begrunnelseArbeidstaker")
      .simulate("change", { target: { value: "Noe tekst til arbeidstaker" } });

    // Feilmeldinger og feiloppsummering forsvinner
    expect(wrapper.find(Feiloppsummering)).to.have.length(0);
    expect(wrapper.find(Feilmelding)).to.have.length(0);

    // Fjern begrunnelser
    textAreas
      .findWhere((w) => w.prop("name") === "begrunnelseArbeidsgiver")
      .simulate("change", { target: { value: "" } });
    textAreas
      .findWhere((w) => w.prop("name") === "begrunnelseArbeidstaker")
      .simulate("change", { target: { value: "" } });

    // Feilmeldinger vises, feiloppsummering vises ved neste submit
    expect(wrapper.find(Feiloppsummering)).to.have.length(0);
    expect(wrapper.find(Feilmelding)).to.have.length(2);

    wrapper.find(Hovedknapp).simulate("click");
    expect(wrapper.find(Feiloppsummering)).to.have.length(1);
  });
  it("avlyser møte ved submit av skjema", () => {
    const mockStore = store({ ...realState });
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/sykefravaer/05087321470/dialogmote/123abc/avlys"]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote/:dialogmoteUuid/avlys">
          <Provider store={mockStore}>
            <AvlysDialogmoteSkjema dialogmote={mote} />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    const textAreas = wrapper.find("textarea");
    textAreas
      .findWhere((w) => w.prop("name") === "begrunnelseArbeidsgiver")
      .simulate("change", { target: { value: "Noe tekst til arbeidsgiver" } });
    textAreas
      .findWhere((w) => w.prop("name") === "begrunnelseArbeidstaker")
      .simulate("change", { target: { value: "Noe tekst til arbeidstaker" } });

    wrapper.find("form").simulate("submit");

    expect(mockStore.getActions()[0]).to.deep.equal({
      type: "AVLYS_MOTE_FORESPURT",
      fnr: "05087321470",
      moteUuid: moteUuid,
      data: {
        arbeidsgiver: {
          avlysning: [],
          begrunnelse: "Noe tekst til arbeidsgiver",
        },
        arbeidstaker: {
          avlysning: [],
          begrunnelse: "Noe tekst til arbeidstaker",
        },
      },
    });
  });
});
