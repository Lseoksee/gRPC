const PROTO_PATH = "./proto/Main.proto";
import grpc = require("@grpc/grpc-js");
import protoLoader = require("@grpc/proto-loader");
import { ProtoGrpcType } from "./types/Main";
import Stream = require("stream");
import NodeBuffer = require("buffer");
import { StreamingReqests } from "./types/grpc/StreamingReqests";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});
const proto: ProtoGrpcType = grpc.loadPackageDefinition(packageDefinition) as any;

/* 
요청/응답 단방향 통신
const helloService = new proto.grpc.HelloService("localhost:8080", grpc.credentials.createInsecure());
helloService.hello(
    {
        firstName: "석",
        lastName: "정현",
    },
    (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    }
) */

const streamingService = new proto.grpc.StreamingService("localhost:8080", grpc.credentials.createInsecure());

// 서버 스트리밍 함수 serverStream() 호출
/* const serverStream = streamingService.serverStream({});
serverStream.on("data", (data)=> {
    const res = data as StreamingResponse;
    console.log(res.result);
}) */

// 양방향 스트리밍 함수 
const interactiveStream = streamingService.interactiveStream();
const stream = new Stream.Writable();
interactiveStream.on("pipe", (data) => {
    console.log("파이프 연결");
    
    data.on("data", (data) => {
        console.log(data);
        
    })
})