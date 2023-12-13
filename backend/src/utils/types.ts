export type User = {
    name: string,
    email: string,
    password: string,
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