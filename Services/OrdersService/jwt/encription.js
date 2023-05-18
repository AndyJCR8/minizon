import { SignJWT, importPKCS8 } from "jose"
import plk from "../tokenKeys/public_key.pem"

import fs from "node:fs"

export async function encode(payload, expiresIn = 25200) {
    try {
        const prk = fs.readFileSync("../tokenKeys/private_key.pem", 'utf8')

        const alg = 'RSA256'
        const privateKey = await importPKCS8(prk, alg)

        const token = await new SignJWT(payload)
        .setProtectedHeader({alg: alg})
        .setExpirationTime(`${expiresIn}s`)
        .sign(privateKey)
        
        return token
    } catch (error) {
        return null
    }
}

export async function decode(token) {
    try {
        
    } catch (error) {
        return null
    }
}

export async function verify(token){
    
}