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

    //서버 패킷 응답 리스너
    interactiveStream.on("data", (data) => {
        const res = data as StreamingResponse 
        console.log(`[서버 패킷]: ${res.result}`);
    });

    //서버가 데이터 전송을 완료하는 메시지 보내면 작동
    interactiveStream.on("end", () => {
        console.log(`[서버 패킷]: 모든 데이터 전송 완료`);
    });

    // 서버에 1초에 한번씩 10개의 패킷을 보냄
    for (let i = 0; i < 10; i++) {
        interactiveStream.write({data: `패킷${i}`}, () => {
            console.log(`[서버에게 전송]: 패킷${i}` );
        });
        await sleep(500);
    }

    // 데이터 전송이 완료되었다는 메시지를 서버에 보냄
    interactiveStream.end();
    console.log("[서버에게 전송]: 전송완료");
    
    // 프로그램이 종료되는 조건 = 서버응답종료 && 클라이언트 데이터 전송 종료
})();

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}
