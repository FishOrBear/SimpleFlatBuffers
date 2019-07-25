import { SimpleFlatBuffers } from "../src/SimpleFlatBuffers";

let f = new SimpleFlatBuffers();

f.writeBool(true);
f.writeBool(true);
f.writeBool(true);
f.writeBool(true);
f.writeBool(true);
f.writeBool(false);
f.writeBool(true);
f.writeBool(true);

f.writeBool(true);
f.writeBool(true);
f.writeInt8(2);
f.writeBool(true);

console.log();


f.reset();

[
    f.readBool(),
    f.readBool(),
    f.readBool(),
    f.readBool(),
    "",

    f.readBool(),
    f.readBool(),
    f.readBool(),
    f.readBool(),

    f.readBool(),
    f.readBool(),

    f.readUint8(),

    f.readBool(),

]//?
