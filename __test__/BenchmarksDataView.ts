import { SimpleFlatBuffersAtDataView } from "../src/SimpleFlatBuffersAtDataView";
import { SimpleFlatBuffers } from "../src/SimpleFlatBuffers";

let count = 1e3;
function test1(f: SimpleFlatBuffers)
{
    var start = performance.now();
    for (let i = 0; i < count; i++)
    {
        f.writeBool(true)
        f.writeBool(false)
        f.writeUint8(-2)
        f.writeInt8(-23)
        f.writeUint16(-2)
        f.writeInt16(-2)
        f.writeUint32(5)
        f.writeInt32(-6)
        f.writeFloat32(-1.1)
        f.writeFloat64(-1.2)
        f.writeString("SimpleFlatBuffers");
    }

    f.reset();


    for (let i = 0; i < count; i++)
    {
        let b1 = f.readBool();//-
        let b2 = f.readBool();//-
        let u8 = f.readUint8();//-
        let i8 = f.readInt8();//-
        let u16 = f.readUint16();//-
        let i16 = f.readInt16();//-
        let u32 = f.readUint32();//-
        let i32 = f.readInt32();//-
        let f32 = f.readFloat32();//-
        let f64 = f.readFloat64();//-
        let str = f.readString();//-
    }

    return performance.now() - start;
}

function test3()
{
    var start = performance.now();
    let arr = [];
    for (let i = 0; i < count; i++)
    {
        arr.push(true)
        arr.push(false)
        arr.push(-2)
        arr.push(-23)
        arr.push(-2)
        arr.push(-2)
        arr.push(5)
        arr.push(-6)
        arr.push(-1.1)
        arr.push(-1.2)
        arr.push("SimpleFlatBuffers");
    }

    let str = JSON.stringify(arr)
    let arr2 = JSON.parse(str)

    let index = 0;

    for (let i = 0; i < count; i++)
    {
        let b1 = arr2[index++];//-
        let b2 = arr2[index++];//-
        let u8 = arr2[index++];//-
        let i8 = arr2[index++];//-
        let u16 = arr2[index++];//-
        let i16 = arr2[index++];//-
        let u32 = arr2[index++];//-
        let i32 = arr2[index++];//-
        let f32 = arr2[index++];//-
        let f64 = arr2[index++];//-
        let str = arr2[index++];//-
    }
    return performance.now() - start;
}


for (let i = 0; i < 1; i++)
{
    let f = new SimpleFlatBuffersAtDataView();
    let f2 = new SimpleFlatBuffers();
    test1(f);//?.
    test1(f2);//?.
    test3()//?.
}
