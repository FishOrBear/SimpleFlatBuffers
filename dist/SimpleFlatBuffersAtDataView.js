"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFlatBuffersAtDataView = void 0;
const SimpleFlatBuffers_1 = require("./SimpleFlatBuffers");
class SimpleFlatBuffersAtDataView extends SimpleFlatBuffers_1.SimpleFlatBuffers {
    bb;
    dataview;
    constructor(bb = new Uint8Array(8)) {
        super(bb);
        this.bb = bb;
        this.dataview = new DataView(this.bb.buffer);
    }
    writeInt8(value) {
        this.prep(1);
        this.dataview.setInt8(this.position, value);
        this.position++;
        return this;
    }
    readInt8() {
        let v = this.dataview.getInt8(this.position);
        this.position++;
        return v;
    }
    writeInt16(value) {
        this.prep(2);
        this.dataview.setInt16(this.position, value);
        this.position += 2;
        return this;
    }
    writeUint16(value) {
        this.prep(2);
        this.dataview.setUint16(this.position, value);
        this.position += 2;
        return this;
    }
    writeInt32(value) {
        this.prep(4);
        this.dataview.setInt32(this.position, value);
        this.position += 4;
        return this;
    }
    writeUint32(value) {
        this.prep(4);
        this.dataview.setUint32(this.position, value);
        this.position += 4;
        return this;
    }
    writeFloat32(value) {
        this.prep(4);
        this.dataview.setFloat32(this.position, value);
        this.position += 4;
        return this;
    }
    writeFloat64(value) {
        this.prep(8);
        this.dataview.setFloat64(this.position, value);
        this.position += 8;
        return this;
    }
    readUint16() {
        let v = this.dataview.getUint16(this.position);
        this.position += 2;
        return v;
    }
    readInt16() {
        let v = this.dataview.getInt16(this.position);
        this.position += 2;
        return v;
    }
    readInt32() {
        let v = this.dataview.getInt32(this.position);
        this.position += 4;
        return v;
    }
    readUint32() {
        let v = this.dataview.getUint32(this.position);
        this.position += 4;
        return v;
    }
    readFloat32() {
        let v = this.dataview.getFloat32(this.position);
        this.position += 4;
        return v;
    }
    readFloat64() {
        let v = this.dataview.getFloat64(this.position);
        this.position += 8;
        return v;
    }
    grow() {
        super.grow();
        this.dataview = new DataView(this.bb.buffer);
        return this;
    }
}
exports.SimpleFlatBuffersAtDataView = SimpleFlatBuffersAtDataView;
//# sourceMappingURL=SimpleFlatBuffersAtDataView.js.map