const path = require("path");

const mockData = require("../mockData");

const requestUtil = require("../util/requestUtil");

const mockOppfolgingsplan = require("./mockOppfolgingsplan");
const mockOppfolgingsplanLPS = require("./mockOppfolgingsplanLPS");

const dokumentinfo = { antallSider: 4 };

const mockSyfooppfolgingsplanservice = (server) => {
  server.get(
    "/syfooppfolgingsplanservice/api/internad/v1/oppfolgingsplan/:fnr",
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(mockOppfolgingsplan.getOppfolgingsplaner());
    }
  );

  server.get(
    "/syfooppfolgingsplanservice/api/internad/v1/oppfolgingsplan/:fnr/historikk",
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockData.getHistorikkOppfolgingsplan()));
    }
  );

  server.get(
    "/syfooppfolgingsplanservice/api/internad/dokument/:id/dokumentinfo",
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(dokumentinfo));
    }
  );

  server.get(
    "/syfooppfolgingsplanservice/api/internad/oppfolgingsplan/lps",
    (req, res) => {
      if (
        req.headers[requestUtil.NAV_PERSONIDENT_HEADER] &&
        req.headers[requestUtil.NAV_PERSONIDENT_HEADER].length === 11
      ) {
        res.setHeader("Content-Type", "application/json");
        res.send(
          JSON.stringify(mockOppfolgingsplanLPS.getOppfolgingsplanerLPS())
        );
      } else {
        res.status(400).send();
      }
    }
  );

  server.get(
    "/syfooppfolgingsplanservice/api/internad/dokument/lps/:uuid",
    (req, res) => {
      const file = path.join(
        __dirname,
        "/oppfolgingsplan/pdf/oppfolgingsplanlps.pdf"
      );
      res.download(file, function (err) {
        if (err) {
          res.status(500).send("Error");
        }
      });
    }
  );
};

module.exports = mockSyfooppfolgingsplanservice;
