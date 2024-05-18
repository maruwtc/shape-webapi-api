import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { auth, adminAuth } from "../config/firebase"

export const handleLogin = async (ctx: any) => {
    const { email, password } = ctx.request.body
    try {
        const authed = await signInWithEmailAndPassword(auth, email, password)
        const data = await authed.user
        const token = await data.getIdToken()
        ctx.body = { data, token }
    }
    catch (error: any) {
        if (error.message === 'Firebase: Error (auth/user-not-found).') {
            ctx.status = 404
            ctx.body = { message: 'User not found' }
            return
        } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
            ctx.status = 401
            ctx.body = { message: 'Wrong password' }
            return
        } else if (error.message === 'Firebase: Error (auth/missing-email).') {
            ctx.status = 400
            ctx.body = { message: 'Missing email' }
            return
        } else if (error.message === 'Firebase: Error (auth/missing-password).') {
            ctx.status = 400
            ctx.body = { message: 'Missing password' }
            return
        }
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

export const handleSignout = async (ctx: any) => {
    try {
        await signOut(auth)
        ctx.body = { message: 'Signout successful' }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

export const handleRegister = async (ctx: any) => {
    const { email, password } = ctx.request.body
    try {
        const authended = await createUserWithEmailAndPassword(auth, email, password)
        const data = await authended.user
        ctx.body = { data }
    } catch (error: any) {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
            ctx.status = 409
            ctx.body = { message: 'Email already in use' }
            return
        } else if (error.message === 'Firebase: Error (auth/weak-password).') {
            ctx.status = 400
            ctx.body = { message: 'Weak password' }
            return
        } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
            ctx.status = 400
            ctx.body = { message: 'Invalid email' }
            return
        }
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

export const isAuthorized = async (ctx: any) => {
    const token = ctx.request.body.token
    try {
        await adminAuth.auth().verifyIdToken(token)
            .then((decodedToken) => {
                const uid = decodedToken.uid
                ctx.body = { uid }
            })
            .catch((error) => {
                ctx.status = 401
                ctx.body = { message: error.message }
            })
    } catch (error: any) {
        if (error.message === 'First argument to verifyIdToken() must be a Firebase ID token string.') {
            ctx.status = 401
            ctx.body = { message: 'Token invalid' }
            return
        }
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

export const getUser = async (ctx: any) => {
    const token = ctx.request.body.token
    try {
        await adminAuth.auth().verifyIdToken(token)
            .then((decodedToken) => {
                const uid = decodedToken.uid
                const email = decodedToken.email
                ctx.body = { uid: uid, email: email }
            })
            .catch((error) => {
                ctx.status = 401
                ctx.body = { message: error.message }
            })
    } catch (error: any) {
        if (error.message === 'Firebase: Error (auth/id-token-expired).') {
            ctx.status = 401
            ctx.body = { message: 'Token expired' }
            return
        } else if (error.message === 'First argument to verifyIdToken() must be a Firebase ID token string.') {
            ctx.status = 401
            ctx.body = { message: 'Invalid token' }
            return
        }
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}