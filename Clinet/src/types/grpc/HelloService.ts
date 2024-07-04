// Original file: proto/Main.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { HelloRequest as _grpc_HelloRequest, HelloRequest__Output as _grpc_HelloRequest__Output } from '../grpc/HelloRequest';
import type { HelloResponse as _grpc_HelloResponse, HelloResponse__Output as _grpc_HelloResponse__Output } from '../grpc/HelloResponse';

export interface HelloServiceClient extends grpc.Client {
  hello(argument: _grpc_HelloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_grpc_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _grpc_HelloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_grpc_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _grpc_HelloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_grpc_HelloResponse__Output>): grpc.ClientUnaryCall;
  hello(argument: _grpc_HelloRequest, callback: grpc.requestCallback<_grpc_HelloResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface HelloServiceHandlers extends grpc.UntypedServiceImplementation {
  hello: grpc.handleUnaryCall<_grpc_HelloRequest__Output, _grpc_HelloResponse>;
  
}

export interface HelloServiceDefinition extends grpc.ServiceDefinition {
  hello: MethodDefinition<_grpc_HelloRequest, _grpc_HelloResponse, _grpc_HelloRequest__Output, _grpc_HelloResponse__Output>
}
