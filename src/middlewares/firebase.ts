import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth"
import { auth, adminAuth, bucket } from "../config/firebase"

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

export const handleRegister = async (ctx: any) => {
    const { email, password, role } = ctx.request.body
    try {
        if (!email || !password) {
            ctx.status = 400
            ctx.body = { message: 'Missing required fields' }
            return
        }
        const authEnded = await createUserWithEmailAndPassword(auth, email, password)
        const data = await authEnded.user
        if (!role) {
            await adminAuth.setCustomUserClaims(data.uid, { role: 'user' })
        } else {
            await adminAuth.setCustomUserClaims(data.uid, { role })
        }
        const userData = await adminAuth.getUser(data.uid)
        const assignedRole = userData.customClaims?.role || 'user'
        ctx.body = { data: userData, role: assignedRole, token: await data.getIdToken()}
        ctx.status = 201
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

export const isAuth = async (ctx: any) => {
    const token = ctx.request.body.token
    try {
        await adminAuth.verifyIdToken(token)
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

export const isAuthorized = async (ctx: any, next: any) => {
    const token = ctx.request.body.token ? ctx.request.body.token : ctx.request.headers.token;
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        const uid = decodedToken.uid;
        ctx.state.uid = uid;
        await next();
    } catch (error: any) {
        if (error.message === 'First argument to verifyIdToken() must be a Firebase ID token string.') {
            ctx.status = 401;
            ctx.body = { message: 'Token invalid' };
        } else if (error.message === 'Firebase: Error (auth/id-token-expired).') {
            ctx.status = 401;
            ctx.body = { message: 'Token expired' };
        } else {
            ctx.status = 401;
            ctx.body = { message: error.message };
        }
    }
};

export const isAdmin = async (ctx: any, next: any) => {
    const token = ctx.request.body.token ? ctx.request.body.token : ctx.request.headers.token;
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        const uid = decodedToken.uid;
        const user = await adminAuth.getUser(uid);
        if (user.customClaims?.role === 'admin') {
            ctx.status = 200;
            ctx.body = { message: 'Authorized' };
            await next();
        } else {
            ctx.status = 403;
            ctx.body = { message: 'Unauthorized' };
        }
    } catch (error: any) {
        if (error.message === 'First argument to verifyIdToken() must be a Firebase ID token string.') {
            ctx.status = 401;
            ctx.body = { message: 'Token invalid' };
        } else if (error.message === 'Firebase: Error (auth/id-token-expired).') {
            ctx.status = 401;
            ctx.body = { message: 'Token expired' };
        } else {
            ctx.status = 401;
            ctx.body = { message: error.message };
        }
    }
}

export const getUser = async (ctx: any) => {
    const token = ctx.request.body.token
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        const uid = decodedToken.uid;
        const email = decodedToken.email;
        const role = decodedToken.role;
        ctx.body = { uid, email, role };
        ctx.status = 200;
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

export const deleteUser = async (ctx: any) => {
    const token = ctx.request.body.token;
    if (!token) {
        ctx.status = 400;
        ctx.body = { message: 'Token is required' };
        return;
    }
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        const uid = decodedToken.uid;
        await adminAuth.deleteUser(uid);
        ctx.status = 200;
        ctx.body = { message: 'User deleted' };
    } catch (error: any) {
        if (error.code === 'auth/id-token-expired') {
            ctx.status = 401;
            ctx.body = { message: 'Token expired' };
        } else if (error.code === 'auth/argument-error') {
            ctx.status = 401;
            ctx.body = { message: 'Invalid token' };
        } else if (error.code === 'auth/user-not-found') {
            ctx.status = 404;
            ctx.body = { message: 'User not found' };
        } else {
            ctx.status = 500;
            ctx.body = { message: error.message };
        }
    }
};

export const uploadImage = async (ctx: any) => {
    const token = ctx.request.body.token
    const image = ctx.request.body.image
    if (!token) {
        ctx.status = 400
        ctx.body = { message: 'Token is required' }
        return
    }
    else if (!image) {
        ctx.status = 400
        ctx.body = { message: 'Image is required' }
        return
    } else {
        const base64Image = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Image, 'base64');
        const fileName = `images/${new Date().getTime()}.png`;
        try {
            await isAuthorized(ctx, async () => {
                const decodedToken = await adminAuth.verifyIdToken(token);
                const uid = decodedToken.uid;
                const file = bucket.file(fileName);
                await file.save(buffer, {
                    metadata: {
                        contentType: 'image/png',
                        metadata: {
                            firebaseStorageDownloadTokens: new Date().getTime()
                        }
                    },
                    public: true
                });
                const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${new Date().getTime()}`;
                ctx.body = { url };
            });
        } catch (error: any) {
            ctx.status = 500;
            ctx.body = { message: error.message };
        }
    }
}