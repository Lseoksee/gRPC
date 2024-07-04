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
        // 클라이언트 스트리밍 데이터 받기
        StreamObserver<StreamingReqests> client =  new StreamObserver<>() {
            @Override
            public void onNext(StreamingReqests value) {
                System.out.println(value);
            }

            @Override
            public void onError(Throwable t) {
            }

            @Override
            public void onCompleted() {
            }
        };

        // 서버쪽 스트리밍 응답
        try {
            for (int i = 0; i < 10; i++) {
                StreamingResponse res = StreamingResponse.newBuilder().setResult("응답" + i).build();
                // System.out.println("클라이언트 응답: "+ res.toString());
                responseObserver.onNext(res);
                Thread.sleep(1000);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }         

        responseObserver.onCompleted();

        return client;
    }

}
