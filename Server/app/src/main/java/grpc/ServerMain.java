package grpc;

import com.google.protobuf.Descriptors.Descriptor;
import com.google.protobuf.Descriptors.FileDescriptor;
import com.google.protobuf.GeneratedMessage.FieldAccessorTable;

import io.grpc.Server;
import io.grpc.ServerBuilder;

public class ServerMain {
    // 여기있는건 proto 컴파일 시 필요한 상수들임
    public static Descriptor internal_static_grpc_HelloRequest_descriptor;
    public static FieldAccessorTable internal_static_grpc_HelloRequest_fieldAccessorTable;
    public static Descriptor internal_static_grpc_HelloResponse_descriptor;
    public static FieldAccessorTable internal_static_grpc_HelloResponse_fieldAccessorTable;

    public static void main(String[] args) throws Exception {

        Server server = ServerBuilder.forPort(8080)
                .addService(new HelloeService())
                .addService(new StreamingService())
                .build();
        System.out.println("8080포트로 gRPC 서버 실행");

        server.start();
        server.awaitTermination();
    }

    // 이것도 proto 컴파일 시 필요한 함수
    public static FileDescriptor getDescriptor() {
        throw new UnsupportedOperationException("Unimplemented method 'getDescriptor'");
    }
}
