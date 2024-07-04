package grpc;

import com.google.protobuf.Empty;

import grpc.StreamingServiceGrpc.StreamingServiceImplBase;
import io.grpc.stub.StreamObserver;

public class StreamingService extends StreamingServiceImplBase {

    @Override
    public void serverStream(Empty request, StreamObserver<StreamingResponse> responseObserver) {
        try {
            for (int i = 0; i < 10; i++) {
                StreamingResponse res = StreamingResponse.newBuilder().setResult("응답" + i).build();
                System.out.println("클라이언트 응답: " + res.toString());
                responseObserver.onNext(res);
                Thread.sleep(1000);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        responseObserver.onCompleted();
    }

    @Override
    public StreamObserver<StreamingReqests> interactiveStream(StreamObserver<StreamingResponse> responseObserver) {
        // 클라이언트에 1초에 1번씩 10개의 패킷을 보낸다 (멀티 쓰레딩)
        // StreamObserver 등록이 return 이후에 진행되는 거라 멀티 쓰레딩 처리 안하면 응답을 못받는다
        ClientReceiver(responseObserver);

        // 클라이언트 응답 받는 함수
        return new StreamObserver<StreamingReqests>() {
            /** 클라이언트에서 요청 오면 해당 메소드가 실행 된다 */
            @Override
            public void onNext(StreamingReqests value) {
                System.out.println("[클라이언트 패킷]: " + value.getData());
            }

            @Override
            public void onError(Throwable t) {
                t.printStackTrace();
            }

            /** 클라이언트가 전송을 끝냈다는 신호를 보내면 해당 메소드가 실행된다 */
            @Override
            public void onCompleted() {
                System.out.println("[클라이언트 패킷]: 요청완료");
            }
        };
    }

    public void ClientReceiver(StreamObserver<StreamingResponse> responseObserver) {
        new Thread() {
            @Override
            public void run() {
                try {
                    for (int i = 0; i < 10; i++) {
                        StreamingResponse res = StreamingResponse.newBuilder().setResult("아이고난!" + i).build();
                        responseObserver.onNext(res);
                        System.out.println("[클라이언트에게 전송]: " + res.getResult());
                        Thread.sleep(1000);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

                System.out.println("[클라이언트에게 전송]: 전송완료");
                responseObserver.onCompleted();
            }
        }.start();
    }
}
