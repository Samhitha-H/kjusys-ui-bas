const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 4202;

app.use(
  cors({
    credentials: true,
    "Access-Control-Allow-Origin": "*",
    origin: "*",
  })
);
/// Serve the placement-student application
app.use(
  "/",
  express.static(
    path.join(__dirname.split("/prod-server")[0], "/dist/placement-student")
  )
);

app.get("*/", (req, res) => {
  if (req.path.endsWith(".js")) {
    res.sendFile(
      path.resolve(
        __dirname.split("/prod-server")[0],
        "/dist/placement-student" + req.path
      )
    );
  } else {
    res.sendFile(
      path.resolve(
        __dirname.split("prod-server")[0],
        "dist/placement-student/index.html"
      )
    );
  }
});
// Start the server
const server = http.createServer(app);
server.listen(port, "0.0.0.0", () => console.log("Running..."));
