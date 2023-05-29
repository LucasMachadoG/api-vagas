import { ServerEnv } from "../../app/envs/server.env";
import { createApp } from "../config/express.config";

export class Server {
    public static run () {
        const app = createApp()

        app.listen (ServerEnv.port, () => {
            console.log("Server is running")
        })
    }
}