import { createServer, } from "http";
import { Logger } from "../src/lib/logger";

createServer((req, res) => {
    req.on('data', (data) => {
        Logger().info(data)
    });

    res.write("200")
    res.end();
}).listen(8080);