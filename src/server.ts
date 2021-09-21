import { SdkgenHttpServer } from "@sdkgen/node-runtime";
import { api } from "./generated/api";
import "./controllers";

const server = new SdkgenHttpServer(api, {});

server.listen(3333);
