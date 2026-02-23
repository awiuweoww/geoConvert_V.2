/* eslint-disable */
// Type declarations for generated coordinate_pb.js
// Auto-generated based on coordinate.proto

import * as jspb from "google-protobuf";

export class Point extends jspb.Message {
    getId(): number;
    setId(value: number): Point;

    getLatitude(): number;
    setLatitude(value: number): Point;

    getLongitude(): number;
    setLongitude(value: number): Point;

    getCreatedAt(): string;
    setCreatedAt(value: string): Point;

    toObject(includeInstance?: boolean): Point.AsObject;
    static toObject(includeInstance: boolean, msg: Point): Point.AsObject;

    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): Point;
}

export namespace Point {
    export type AsObject = {
        id: number;
        latitude: number;
        longitude: number;
        createdAt: string;
    };
}

export class SavePointRequest extends jspb.Message {
    getLatitude(): number;
    setLatitude(value: number): SavePointRequest;

    getLongitude(): number;
    setLongitude(value: number): SavePointRequest;

    toObject(includeInstance?: boolean): SavePointRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SavePointRequest): SavePointRequest.AsObject;

    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): SavePointRequest;
}

export namespace SavePointRequest {
    export type AsObject = {
        latitude: number;
        longitude: number;
    };
}

export class SavePointResponse extends jspb.Message {
    getPoint(): Point | undefined;
    setPoint(value?: Point): SavePointResponse;
    hasPoint(): boolean;
    clearPoint(): SavePointResponse;

    toObject(includeInstance?: boolean): SavePointResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SavePointResponse): SavePointResponse.AsObject;

    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): SavePointResponse;
}

export namespace SavePointResponse {
    export type AsObject = {
        point?: Point.AsObject;
    };
}

export class GetPointsRequest extends jspb.Message {
    toObject(includeInstance?: boolean): GetPointsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetPointsRequest): GetPointsRequest.AsObject;

    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): GetPointsRequest;
}

export namespace GetPointsRequest {
    export type AsObject = {};
}

export class GetPointsResponse extends jspb.Message {
    getPointsList(): Point[];
    setPointsList(value: Point[]): GetPointsResponse;
    addPoints(value?: Point, index?: number): Point;
    clearPointsList(): GetPointsResponse;

    toObject(includeInstance?: boolean): GetPointsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetPointsResponse): GetPointsResponse.AsObject;

    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): GetPointsResponse;
}

export namespace GetPointsResponse {
    export type AsObject = {
        pointsList: Point.AsObject[];
    };
}

export class DeletePointRequest extends jspb.Message {
    getId(): number;
    setId(value: number): DeletePointRequest;

    toObject(includeInstance?: boolean): DeletePointRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeletePointRequest): DeletePointRequest.AsObject;

    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): DeletePointRequest;
}

export namespace DeletePointRequest {
    export type AsObject = {
        id: number;
    };
}

export class DeletePointResponse extends jspb.Message {
    getSuccess(): boolean;
    setSuccess(value: boolean): DeletePointResponse;

    toObject(includeInstance?: boolean): DeletePointResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeletePointResponse): DeletePointResponse.AsObject;

    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): DeletePointResponse;
}

export namespace DeletePointResponse {
    export type AsObject = {
        success: boolean;
    };
}

export class DeleteAllPointsRequest extends jspb.Message {
    toObject(includeInstance?: boolean): DeleteAllPointsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteAllPointsRequest): DeleteAllPointsRequest.AsObject;

    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): DeleteAllPointsRequest;
}

export namespace DeleteAllPointsRequest {
    export type AsObject = {};
}

export class DeleteAllPointsResponse extends jspb.Message {
    getDeletedCount(): number;
    setDeletedCount(value: number): DeleteAllPointsResponse;

    toObject(includeInstance?: boolean): DeleteAllPointsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteAllPointsResponse): DeleteAllPointsResponse.AsObject;

    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): DeleteAllPointsResponse;
}

export namespace DeleteAllPointsResponse {
    export type AsObject = {
        deletedCount: number;
    };
}
