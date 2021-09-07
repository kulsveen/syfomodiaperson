import { initialize, Strategy } from "unleash-client";

import * as express from "express";

export const router = express.Router();

class ByEnhetAndEnvironment extends Strategy {
  constructor() {
    super("byEnhetAndEnvironment");
  }

  isEnabled(parameters, context) {
    const valgtEnhetMatches =
      parameters.valgtEnhet.indexOf(context.valgtEnhet) !== -1;
    const environmentEnabled =
      parameters.tilgjengeligIProd === "true"
        ? true
        : process.env.NAIS_CONTEXT === "dev";

    return valgtEnhetMatches && environmentEnabled;
  }
}

class ByUserId extends Strategy {
  constructor() {
    super("byUserId");
  }

  isEnabled(parameters, context) {
    return parameters.user.indexOf(context.user) !== -1;
  }
}

const unleash = initialize({
  url: "https://unleash.nais.io/api/",
  appName: "syfomodiaperson",
  environment: process.env.NAIS_CONTEXT,
  strategies: [new ByEnhetAndEnvironment(), new ByUserId()],
});

export default router.get("/dm2/", function (req, res) {
  const enhetNr = req.query.valgtEnhet?.toString();
  const userId = req.query.userId?.toString();

  const isEnabled = unleash.isEnabled("syfo.syfomodiaperson.dm2", {
    valgtEnhet: enhetNr,
    user: userId,
  });

  res.status(200).send(isEnabled);
});
