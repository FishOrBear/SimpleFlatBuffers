import { SimpleFlatBuffers } from "./SimpleFlatBuffers";
export declare class SimpleFlatBuffersAtDataView extends SimpleFlatBuffers {
    bb: Uint8Array;
    dataview: DataView;
    constructor(bb?: Uint8Array);
    writeInt8(value: number): this;
    readInt8(): number;
    writeInt16(value: number): this;
    writeUint16(value: number): this;
    writeInt32(value: number): this;
    writeUint32(value: number): this;
    writeFloat32(value: number): this;
    writeFloat64(value: number): this;
    readUint16(): number;
    readInt16(): number;
    readInt32(): number;
    readUint32(): number;
    readFloat32(): number;
    readFloat64(): number;
    protected grow(): this;
}
