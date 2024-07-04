package grpc;

import grpc.HelloServiceGrpc.HelloServiceImplBase;
import io.grpc.stub.StreamObserver;

public class HelloeService extends HelloServiceImplBase {

    @Override
    public void hello(HelloRequest request, StreamObserver<HelloResponse> responseObserver) {
        System.out.println(request.getFirstName()); // proto HelloRequest 에 정의한 firstName
        System.out.println(request.getLastName()); // proto lastName 에 정의한 firstName

        // proto HelloResponse 에 정의한 greeting 에 값을 넣어 클라이언트에 전달
        HelloResponse res =  HelloResponse.newBuilder().setGreeting("forder").build();
        responseObserver.onNext(res);
        responseObserver.onCompleted();
    }
}
