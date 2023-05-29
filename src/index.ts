import { typeormConnection } from "./main/database/typeorm.connection";
import { Server } from "./main/server/express.server";

typeormConnection.init().then(Server.run)
