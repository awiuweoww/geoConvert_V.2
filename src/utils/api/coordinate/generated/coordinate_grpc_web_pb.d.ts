/* eslint-disable */
// Type declarations for generated coordinate_grpc_web_pb.js
// Auto-generated based on coordinate.proto

import * as grpcWeb from "grpc-web";
import * as pb from "./coordinate_pb";

export class CoordinateServiceClient {
    constructor(
        hostname: string,
        credentials?: null,
        options?: grpcWeb.GrpcWebClientBaseOptions
    );

    savePoint(
        request: pb.SavePointRequest,
        metadata: grpcWeb.Metadata | undefined,
        callback: (err: grpcWeb.RpcError, response: pb.SavePointResponse) => void
    ): grpcWeb.ClientReadableStream<pb.SavePointResponse>;

    getPoints(
        request: pb.GetPointsRequest,
        metadata: grpcWeb.Metadata | undefined,
        callback: (err: grpcWeb.RpcError, response: pb.GetPointsResponse) => void
    ): grpcWeb.ClientReadableStream<pb.GetPointsResponse>;

    deletePoint(
        request: pb.DeletePointRequest,
        metadata: grpcWeb.Metadata | undefined,
        callback: (err: grpcWeb.RpcError, response: pb.DeletePointResponse) => void
    ): grpcWeb.ClientReadableStream<pb.DeletePointResponse>;

    deleteAllPoints(
        request: pb.DeleteAllPointsRequest,
        metadata: grpcWeb.Metadata | undefined,
        callback: (err: grpcWeb.RpcError, response: pb.DeleteAllPointsResponse) => void
    ): grpcWeb.ClientReadableStream<pb.DeleteAllPointsResponse>;
}

export class CoordinateServicePromiseClient {
    constructor(
        hostname: string,
        credentials?: null,
        options?: grpcWeb.GrpcWebClientBaseOptions
    );

    savePoint(
        request: pb.SavePointRequest,
        metadata?: grpcWeb.Metadata
    ): Promise<pb.SavePointResponse>;

    getPoints(
        request: pb.GetPointsRequest,
        metadata?: grpcWeb.Metadata
    ): Promise<pb.GetPointsResponse>;

    deletePoint(
        request: pb.DeletePointRequest,
        metadata?: grpcWeb.Metadata
    ): Promise<pb.DeletePointResponse>;

    deleteAllPoints(
        request: pb.DeleteAllPointsRequest,
        metadata?: grpcWeb.Metadata
    ): Promise<pb.DeleteAllPointsResponse>;
}
