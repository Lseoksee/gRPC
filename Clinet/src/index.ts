const PROTO_PATH = "./proto/Main.proto";
import grpc = require("@grpc/grpc-js");
import protoLoader = require("@grpc/proto-loader");
import { ProtoGrpcType } from "./types/Main";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});
const proto: ProtoGrpcType = grpc.loadPackageDefinition(packageDefinition) as any;

const client = new proto.grpc.HelloService("localhost:8080", grpc.credentials.createInsecure());
client.hello(
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
)
