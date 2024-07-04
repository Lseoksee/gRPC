// Original file: proto/Main.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { StreamingReqests as _grpc_StreamingReqests, StreamingReqests__Output as _grpc_StreamingReqests__Output } from '../grpc/StreamingReqests';
import type { StreamingResponse as _grpc_StreamingResponse, StreamingResponse__Output as _grpc_StreamingResponse__Output } from '../grpc/StreamingResponse';

export interface StreamingServiceClient extends grpc.Client {
  interactiveStream(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_grpc_StreamingReqests, _grpc_StreamingResponse__Output>;
  interactiveStream(options?: grpc.CallOptions): grpc.ClientDuplexStream<_grpc_StreamingReqests, _grpc_StreamingResponse__Output>;
  
  serverStream(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_grpc_StreamingResponse__Output>;
  serverStream(argument: _google_protobuf_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_grpc_StreamingResponse__Output>;
  
}

export interface StreamingServiceHandlers extends grpc.UntypedServiceImplementation {
  interactiveStream: grpc.handleBidiStreamingCall<_grpc_StreamingReqests__Output, _grpc_StreamingResponse>;
  
  serverStream: grpc.handleServerStreamingCall<_google_protobuf_Empty__Output, _grpc_StreamingResponse>;
  
}

export interface StreamingServiceDefinition extends grpc.ServiceDefinition {
  interactiveStream: MethodDefinition<_grpc_StreamingReqests, _grpc_StreamingResponse, _grpc_StreamingReqests__Output, _grpc_StreamingResponse__Output>
  serverStream: MethodDefinition<_google_protobuf_Empty, _grpc_StreamingResponse, _google_protobuf_Empty__Output, _grpc_StreamingResponse__Output>
}
