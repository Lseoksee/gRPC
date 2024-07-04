const PROTO_PATH = "./proto/Main.proto";
import grpc = require("@grpc/grpc-js");
import protoLoader = require("@grpc/proto-loader");
import { ProtoGrpcType } from "./types/Main";
import { StreamingResponse } from "./types/grpc/StreamingResponse";

(async () => {
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
    interactiveStream.on("data", (data) => {
        const res = data as StreamingResponse 
        console.log(`[서버 패킷]: ${res.result}`);
    });

    for (let i = 0; i < 10; i++) {
        interactiveStream.write({data: `패킷${i}`}, () => {
            console.log(`[서버에게 전송]: 패킷${i}` );
        });
        await sleep(500);
    }

    // 서버에 데이터가 전부 전송되었다는 것을 보낸다
    interactiveStream.end();

    // 프로그램이 종료되는 조건 = 서버응답종료 && 클라이언트 데이터 전송 종료
})();

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}
