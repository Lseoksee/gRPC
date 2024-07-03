import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { HelloServiceClient as _grpc_HelloServiceClient, HelloServiceDefinition as _grpc_HelloServiceDefinition } from './grpc/HelloService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  grpc: {
    HelloRequest: MessageTypeDefinition
    HelloResponse: MessageTypeDefinition
    HelloService: SubtypeConstructor<typeof grpc.Client, _grpc_HelloServiceClient> & { service: _grpc_HelloServiceDefinition }
  }
}

