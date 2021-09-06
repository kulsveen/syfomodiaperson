import { sykmeldingerMock } from "../data/sykmeldingerMock";
import { SYFOSMREGISTER_ROOT } from "../../src/apiConstants";

const Auth = require("../../server/auth/index");

export const mockSyfosmregister = (server) => {
  server.get(
    `${SYFOSMREGISTER_ROOT}/internal/sykmeldinger`,
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(sykmeldingerMock));
    }
  );
};
