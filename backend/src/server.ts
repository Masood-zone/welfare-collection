import http from "http";
import app from "./app";

const PORT = process.env.PORT || 8080;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
