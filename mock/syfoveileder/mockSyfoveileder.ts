import { veilederMock } from "../data/veilederMock";
import { SYFOVEILEDER_ROOT } from "../../src/apiConstants";

const Auth = require("../../server/auth/index");

export const mockSyfoveileder = (server) => {
  server.get(
    `${SYFOVEILEDER_ROOT}/veileder/self`,
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(veilederMock));
    }
  );
};
