const int32 = new Int32Array(2);
const float32 = new Float32Array(int32.buffer);
const float64 = new Float64Array(int32.buffer);
const isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;

export enum StringCount
{
    Uint8 = 1,
    Uint16 = 2,
    Uint32 = 4,
}

export class SimpleFlatBuffers
{
    position = 0;
    constructor(public bb = new Uint8Array(1024))
    {
    }

    finish()
    {
        this.bb = this.bb.subarray(0, this.position);

        return this;
    }

    reset()
    {
        this.position = 0;
        this.boolOffset = undefined;
        this.boolPosition = undefined;

        return this;
    }

    private boolPosition: number;
    private boolOffset: number;
    writeBool(d: boolean)
    {
        if (this.boolPosition !== undefined)
        {
            if (d)
                this.bb[this.boolPosition] |= 1 << this.boolOffset;
            this.boolOffset++;

            if (this.boolOffset === 8)
                this.boolPosition = undefined;
        }
        else
        {
            this.boolPosition = this.position;
            this.boolOffset = 1;
            this.writeInt8(d ? 1 : 0);
        }

        return this;
    }

    readBool(): boolean
    {
        if (this.boolPosition !== undefined)
        {
            let v = this.bb[this.boolPosition];
            let bool = (v & (1 << this.boolOffset)) !== 0;

            this.boolOffset++;
            if (this.boolOffset === 8)
                this.boolPosition = undefined;
            return bool;
        }
        else
        {
            this.boolPosition = this.position;
            let v = this.readUint8();
            let bool = (v & 1) !== 0;
            this.boolOffset = 1;
            return bool;
        }
    }

    writeInt8(value: number)
    {
        this.prep(1);

        this.bb[this.position] = value;
        this.position++;

        return this;
    }

    writeUint8(value: number)
    {
        this.writeInt8(value);
        return this;
    }

    writeInt16(value: number)
    {
        this.prep(2);

        this.bb[this.position] = value;
        this.bb[this.position + 1] = value >> 8;

        this.position += 2;

        return this;
    }
    writeUint16(value: number)
    {
        this.writeInt16(value);
        return this;
    }

    writeInt32(value: number)
    {
        this.prep(4);

        this.bb[this.position] = value;
        this.bb[this.position + 1] = value >> 8;
        this.bb[this.position + 2] = value >> 16;
        this.bb[this.position + 3] = value >> 24;

        this.position += 4;
        return this;
    }
    writeUint32(value: number)
    {
        this.writeInt32(value);
        return this;
    }

    writeFloat32(value: number)
    {
        float32[0] = value;
        this.writeInt32(int32[0]);
        return this;
    }

    writeFloat64(value: number)
    {
        float64[0] = value;
        this.writeInt32(int32[isLittleEndian ? 0 : 1]);
        this.writeInt32(int32[isLittleEndian ? 1 : 0]);
        return this;
    }

    /*
    //In 'nodejs', the performance of this method is very high, but the performance of this method is very poor in the browser.
    //https://jsperf.com/nativeencodevsmanual
    //https://bugs.chromium.org/p/v8/issues/detail?id=4383
    private writeString2(s: string)
    {
        let b = encode.encode(s);
        this.writeInt16(b.length);

        this.prep(b.length);

        this.bb.set(b, this.position);
        this.position += b.length;
    }
    */

    writeString(s: string, stringCount = StringCount.Uint16)
    {
        let op = this.position;

        let writeCountFuntion: Function;
        switch (stringCount)
        {
            case StringCount.Uint8:
                writeCountFuntion = this.writeUint8;
                break;
            case StringCount.Uint16:
                writeCountFuntion = this.writeUint16;
                break;
            case StringCount.Uint32:
                writeCountFuntion = this.writeUint32;
                break;
            default:
                break;
        }
        writeCountFuntion.call(this, 0);
        let i = 0;
        while (i < s.length)
        {
            let codePoint: number;
            // Decode UTF-16
            let a = s.charCodeAt(i++);
            if (a < 0xD800 || a >= 0xDC00)
            {
                codePoint = a;
            }
            else
            {
                let b = s.charCodeAt(i++);
                codePoint = (a << 10) + b + (0x10000 - (0xD800 << 10) - 0xDC00);
            }

            // Encode UTF-8
            if (codePoint < 0x80)
            {
                this.writeUint8(codePoint);
            }
            else
            {
                if (codePoint < 0x800)
                {
                    this.writeUint8(((codePoint >> 6) & 0x1F) | 0xC0);
                }
                else
                {
                    if (codePoint < 0x10000)
                    {
                        this.writeUint8(((codePoint >> 12) & 0x0F) | 0xE0);
                    }
                    else
                    {
                        this.writeUint8(((codePoint >> 18) & 0x07) | 0xF0);
                        this.writeUint8(((codePoint >> 12) & 0x3F) | 0x80);
                    }
                    this.writeUint8(((codePoint >> 6) & 0x3F) | 0x80);
                }
                this.writeUint8((codePoint & 0x3F) | 0x80);
            }
        }

        let np = this.position;
        this.position = op;
        writeCountFuntion.call(this, np - op - 2);
        this.position = np;
        return this;
    }

    /*
    readString2(): string
    {
        let count = this.readInt16();
        let b = this.bb.subarray(this.position, this.position + count);
        this.position += count;
        return decode.decode(b);
    }
    */

    readString(stringCount = StringCount.Uint16): string
    {
        let count = 0;
        switch (stringCount)
        {
            case StringCount.Uint8:
                count = this.readUint8();
                break;
            case StringCount.Uint16:
                count = this.readUint16();
                break;
            case StringCount.Uint32:
                count = this.readUint32();
                break;
        }

        let result = "";
        let i = 0;
        while (i < count)
        {
            let codePoint: number;

            // Decode UTF-8
            let a = this.readUint8();
            i++;
            if (a < 0xC0)
            {
                codePoint = a;
            }
            else
            {
                let b = this.readUint8();
                i++;
                if (a < 0xE0)
                {
                    codePoint =
                        ((a & 0x1F) << 6) |
                        (b & 0x3F);
                }
                else
                {
                    let c = this.readUint8();
                    i++;
                    if (a < 0xF0)
                    {
                        codePoint =
                            ((a & 0x0F) << 12) |
                            ((b & 0x3F) << 6) |
                            (c & 0x3F);
                    }
                    else
                    {
                        let d = this.readUint8();
                        i++;
                        codePoint =
                            ((a & 0x07) << 18) |
                            ((b & 0x3F) << 12) |
                            ((c & 0x3F) << 6) |
                            (d & 0x3F);
                    }
                }
            }

            // Encode UTF-16
            if (codePoint < 0x10000)
            {
                result += String.fromCharCode(codePoint);
            }
            else
            {
                codePoint -= 0x10000;
                result += String.fromCharCode(
                    (codePoint >> 10) + 0xD800,
                    (codePoint & ((1 << 10) - 1)) + 0xDC00);
            }
        }

        return result;
    }

    readUint8(): number
    {
        let v = this.bb[this.position];
        this.position++;
        return v;
    }

    readInt8(): number
    {
        let v = this.bb[this.position];
        this.position++;
        return v << 16 >> 16;
    }

    readUint16(): number
    {
        let v = this.bb[this.position] | this.bb[this.position + 1] << 8;
        this.position += 2;
        return v;
    }

    readInt16(): number
    {
        return this.readUint16() << 16 >> 16;
    }

    readInt32(): number
    {
        let v = this.bb[this.position] | this.bb[this.position + 1] << 8 | this.bb[this.position + 2] << 16 | this.bb[this.position + 3] << 24;
        this.position += 4;
        return v;
    }
    readUint32()
    {
        return this.readInt32() >>> 0;
    }

    readFloat32(): number
    {
        int32[0] = this.readInt32();
        return float32[0];
    }

    readFloat64(): number
    {
        int32[isLittleEndian ? 0 : 1] = this.readInt32();
        int32[isLittleEndian ? 1 : 0] = this.readInt32();
        return float64[0];
    }

    protected prep(size: number)
    {
        if (this.bb.length - this.position < size)
            this.grow();

        return this;
    }

    protected grow()
    {
        let nbb = new Uint8Array(this.bb.length << 1);
        nbb.set(this.bb);
        this.bb = nbb;
        return this;
    }
}
