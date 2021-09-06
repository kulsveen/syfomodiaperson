import { NAV_PERSONIDENT_HEADER } from "../util/requestUtil";
import { prediksjonMock } from "../data/prediksjonMock";
import { ISPREDIKSJON_ROOT } from "../../src/apiConstants";

const Auth = require("../../server/auth/index");

export const mockIsprediksjon = (server) => {
  server.get(
    `${ISPREDIKSJON_ROOT}/prediksjon`,
    Auth.ensureAuthenticated(),
    (req, res) => {
      if (
        req.headers[NAV_PERSONIDENT_HEADER] &&
        req.headers[NAV_PERSONIDENT_HEADER].length === 11
      ) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(prediksjonMock));
      } else {
        res.status(400).send("Did not find PersonIdent in headers");
      }
    }
  );
};
