import { vedtakMock } from "../data/vedtakMock";
import { VEDTAK_ROOT } from "../../src/apiConstants";

const Auth = require("../../server/auth/index");

export const mockVedtak = (server) => {
  server.get(`${VEDTAK_ROOT}`, Auth.ensureAuthenticated(), (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(vedtakMock));
  });
};
