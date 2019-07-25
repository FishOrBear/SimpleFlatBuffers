export declare enum StringCount {
    Uint8 = 1,
    Uint16 = 2,
    Uint32 = 4
}
export declare class SimpleFlatBuffers {
    bb: Uint8Array;
    position: number;
    constructor(bb?: Uint8Array);
    finish(): this;
    reset(): this;
    private boolPosition;
    private boolOffset;
    writeBool(d: boolean): this;
    readBool(): boolean;
    writeInt8(value: number): this;
    writeUint8(value: number): this;
    writeInt16(value: number): this;
    writeUint16(value: number): this;
    writeInt32(value: number): this;
    writeUint32(value: number): this;
    writeFloat32(value: number): this;
    writeFloat64(value: number): this;
    writeString(s: string, stringCount?: StringCount): this;
    readString(stringCount?: StringCount): string;
    readUint8(): number;
    readInt8(): number;
    readUint16(): number;
    readInt16(): number;
    readInt32(): number;
    readUint32(): number;
    readFloat32(): number;
    readFloat64(): number;
    protected prep(size: number): this;
    protected grow(): this;
}
