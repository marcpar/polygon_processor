import { createServer, } from "http";

createServer((req, res) => {
    req.on('data', (data) => {
        console.log(Buffer.from(data).toString('utf-8'))
    });

    res.write("200")
    res.end();
}).listen(8080);