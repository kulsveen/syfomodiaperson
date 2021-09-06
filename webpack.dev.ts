import { merge } from "webpack-merge";
import mockEndepunkter from "./mock/mockEndepunkter";

const express = require("express");
const common = require("./webpack.common");
const path = require("path");

const Auth = require("./server/auth/index");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    inline: true,
    staticOptions: {
      redirect: false,
    },
    after: (app, server, compiler) => {
      setupDev(app, compiler);
    },
  },
});

const setupDev = async (app, compiler) => {
  await Auth.setupAuth(app);

  mockEndepunkter(app);
  app.use("/static", express.static(path.resolve(__dirname, "dist")));

  app.use("*", (req, res) => {
    const filename = path.join(compiler.outputPath, "index.html");
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        res.status(404).sendFile(path.resolve(__dirname, "public/error.html"));
        return;
      }

      res.set("Content-Type", "text/html");
      res.send(result);
      res.end();
    });
  });
};
