import { SignJWT, jwtVerify } from "jose"

export async function encode(payload, expiresIn = 25200) {
    try {
        const alg = 'HS256'
        const secret = new TextEncoder().encode(process.env.JWT_PASS)
        
        const token = await new SignJWT(payload)
        .setProtectedHeader({alg: alg})
        .setExpirationTime(`${expiresIn}s`)
        .sign(secret)
        console.log(token)
        
        return token
    } catch (error) {
        console.log(error.message)
        return null
    }
}

export async function decode(token) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_PASS)
        const { payload, protectedHeader } = await jwtVerify(token, secret)

        return {"Payload": payload, "Header": protectedHeader}
    } catch (error) {
        return null
    }
}

export async function verify(token) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_PASS)
        await jwtVerify(token, secret)
        return { "verified": true }
    } catch (error) {
        console.log(error.message)
        return { "verified": false }
    }
}