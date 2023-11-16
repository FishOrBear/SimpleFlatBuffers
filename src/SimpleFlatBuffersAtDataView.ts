import { SimpleFlatBuffers } from "./SimpleFlatBuffers";

export class SimpleFlatBuffersAtDataView extends SimpleFlatBuffers
{
    dataview: DataView;
    constructor(public bb = new Uint8Array(8))
    {
        super(bb);
        this.dataview = new DataView(this.bb.buffer);
    }

    writeInt8(value: number)
    {
        this.prep(1);
        this.dataview.setInt8(this.position, value);
        this.position++;
        return this;
    }
    readInt8()
    {
        let v = this.dataview.getInt8(this.position);
        this.position++;
        return v;
    }

    writeInt16(value: number)
    {
        this.prep(2);

        this.dataview.setInt16(this.position, value);

        this.position += 2;
        return this;
    }
    writeUint16(value: number)
    {
        this.prep(2);

        this.dataview.setUint16(this.position, value);

        this.position += 2;
        return this;
    }

    writeInt32(value: number)
    {
        this.prep(4);

        this.dataview.setInt32(this.position, value);

        this.position += 4;
        return this;
    }
    writeUint32(value: number)
    {
        this.prep(4);

        this.dataview.setUint32(this.position, value);

        this.position += 4;
        return this;
    }

    writeFloat32(value: number)
    {
        this.prep(4);

        this.dataview.setFloat32(this.position, value);

        this.position += 4;
        return this;
    }

    writeFloat64(value: number)
    {
        this.prep(8);

        this.dataview.setFloat64(this.position, value);

        this.position += 8;
        return this;
    }


    readUint16(): number
    {
        let v = this.dataview.getUint16(this.position);
        this.position += 2;
        return v;
    }

    readInt16(): number
    {
        let v = this.dataview.getInt16(this.position);
        this.position += 2;
        return v;
    }

    readInt32(): number
    {
        let v = this.dataview.getInt32(this.position);
        this.position += 4;
        return v;
    }
    readUint32()
    {
        let v = this.dataview.getUint32(this.position);
        this.position += 4;
        return v;
    }

    readFloat32(): number
    {
        let v = this.dataview.getFloat32(this.position);
        this.position += 4;
        return v;
    }

    readFloat64(): number
    {
        let v = this.dataview.getFloat64(this.position);
        this.position += 8;
        return v;
    }

    protected grow()
    {
        super.grow();

        this.dataview = new DataView(this.bb.buffer);

        return this;
    }
}
