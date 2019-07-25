import { SimpleFlatBuffersAtDataView } from "../src/SimpleFlatBuffersAtDataView";
import { SimpleFlatBuffers } from "../src/SimpleFlatBuffers";

let f = new SimpleFlatBuffersAtDataView(new Uint8Array(6e7));

let count = 5e5;
function test1(f: SimpleFlatBuffers)
{

    for (let i = 0; i < count; i++)
    {
        f.writeBool(true)
        f.writeBool(false)
        f.writeUint8(1)
        f.writeInt8(2)
        f.writeUint16(3)
        f.writeInt16(4)
        f.writeUint32(5)
        f.writeInt32(6)
        f.writeFloat32(1.1)
        f.writeFloat64(1.2)
        f.writeString("SimpleFlatBuffers");
    }

    f.reset();


    for (let i = 0; i < count; i++)
    {
        let b1 = f.readBool();// - true
        let b2 = f.readBool();// - false
        let u8 = f.readUint8();// - 1
        let i8 = f.readInt8();// - 1
        let u16 = f.readUint16();// - 1
        let i16 = f.readInt16();// - 1
        let u32 = f.readUint32();// - 1
        let i32 = f.readInt32();// - 1
        let f32 = f.readFloat32();// - 1.1
        let f64 = f.readFloat64();// - 1.2
        let str = f.readString();// - "SimpleFlatBuffers"
    }

}


test1(f);//?.

let f2 = new SimpleFlatBuffers(new Uint8Array(6e7));
test1(f2);//?.
