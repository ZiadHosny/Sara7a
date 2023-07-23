declare module 'express-session' {
    interface SessionData {
        isLoggedIn: boolean;
    }
}



export type User = {
    name: string,
    email: string,
    password: string,
    age: number,
    emailConfirm: boolean,
}

export type EmailData = {
    userEmail: string;
    subject: string;
    token: string
}

export type EmailHtml = {
    token: string,
}

export type Message = {
    message: string,
    userId: string,
}