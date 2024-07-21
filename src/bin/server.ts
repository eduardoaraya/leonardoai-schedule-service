import "../app/bootstrap";
import server from "../libs/infra/http";

server.listen(
  process.env.PORT, 
  () => console.log(`Server on port: ${process.env.PORT}`)
);
