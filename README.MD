Simplified version of 'Google /flatbuffers',Implement with 'typescript'.

`npm i simpleflatbuffers`

Example:
```typescript
let f = new SimpleFlatBuffers();
f.writeBool(true)
    .writeBool(false)
    .writeUint8(1)
    .writeInt8(1)
    .writeUint16(1)
    .writeInt16(1)
    .writeUint32(1)
    .writeInt32(1)
    .writeFloat32(1.1)
    .writeFloat64(1.2)
    .writeString("SimpleFlatBuffers");

f.reset();

let b1 = f.readBool();//? true
let b2 = f.readBool();//? false
let u8 = f.readUint8();//? 1
let i8 = f.readInt8();//? 1
let u16 = f.readUint16();//? 1
let i16 = f.readInt16();//? 1
let u32 = f.readUint32();//? 1
let i32 = f.readInt32();//? 1
let f32 = f.readFloat32();//? 1.1
let f64 = f.readFloat64();//? 1.2
let str = f.readString();//? "SimpleFlatBuffers"
```

LICENSE:
https://github.com/google/flatbuffers/blob/master/LICENSE.txt
