// 在main.ts中
import http from "http";

import {mapRoute} from "./common";
import {CatsController} from "./cats.controller";

// const http = require('http');

const controller = mapRoute(CatsController);

http.createServer((req,res) => {
 for(let route of controller.routes) {
 let routeName = (route as any).route;
 if(req.url === routeName) {
            res.setHeader("Content-Type","text/palin");
            res.end((route as any).fn());
        }
    }
}).listen(3000,()=>{
    console.log("Port 3000 is listening");
})

