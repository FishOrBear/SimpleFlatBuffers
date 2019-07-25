import { SimpleFlatBuffers } from "../src/SimpleFlatBuffers"

let count = 1e5;

function test1()
{
    let f = new SimpleFlatBuffers();
    for (let i = 0; i < count; i++)
    {
        // f.writeString2("凡达发达省份个发达省份理科股价来看让未来科技rlfkladfkajjkfzdgjkldsfgn.123123hjiktgrs");
    }

    f.reset();
    for (let i = 0; i < count; i++)
    {
        let str = f.readString();
        // console.log('str: ', str);
    }
}

function test2()
{
    let f = new SimpleFlatBuffers();
    for (let i = 0; i < count; i++)
    {
        f.writeString("凡达发达省份个发达省份理科股价来看让未来科技rlfkladfkajjkfzdgjkldsfgn.123123hjiktgrs");
    }

    f.reset();
    for (let i = 0; i < count; i++)
    {
        let str = f.readString();
        // console.log('str: ', str);
    }
}

console.time();
test1();//?.
console.timeEnd();

console.time();
test2()//?.
console.timeEnd();


function encode1(s: string)
{
    let i = 0;
    let utf8 = [];
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
            utf8.push(codePoint);
        }
        else
        {
            if (codePoint < 0x800)
            {
                utf8.push(((codePoint >> 6) & 0x1F) | 0xC0);
            } else
            {
                if (codePoint < 0x10000)
                {
                    utf8.push(((codePoint >> 12) & 0x0F) | 0xE0);
                }
                else
                {
                    utf8.push(((codePoint >> 18) & 0x07) | 0xF0);
                    utf8.push(((codePoint >> 12) & 0x3F) | 0x80);
                }
                utf8.push(((codePoint >> 6) & 0x3F) | 0x80);
            }
            utf8.push((codePoint & 0x3F) | 0x80);
        }
    }
    return utf8;
}

function encode2(s: string)
{
    return new TextEncoder().encode(s);
}


function test3()
{
    for (let i = 0; i < 1e6; i++)
    {
        encode1("凡达发达省份个发达省份理科股价来看让未来科技rlfkladfkajjkfzdgjkldsfgn.123123hjiktgrs")
    }
}

function test4()
{
    for (let i = 0; i < 1e6; i++)
    {
        encode2("凡达发达省份个发达省份理科股价来看让未来科技rlfkladfkajjkfzdgjkldsfgn.123123hjiktgrs")
    }
}

console.time();
test3();//?.
console.timeEnd();

console.time();
test4();//?.
console.timeEnd();
