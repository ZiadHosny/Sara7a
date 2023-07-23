export const getFromEnv = () => {

    const port = Number(process.env.PORT) || 3000
    const baseUrl = process.env.BASE_URL || ''
    const baseUrlWithPort = process.env.BASE_URL_WITH_PORT

    const mode = process.env.MODE || 'dev'

    const user = process.env.USER
    const email = process.env.EMAIL
    const pass = process.env.PASS
    const emailService = process.env.EMAIL_SERVICE

    const mongoDBUrl = process.env.MONOGO_DB_URL || ''

    const secretKey = process.env.SECRET_KEY || ''
    const rounds = Number(process.env.ROUNDS) || 8

    return {
        port,
        baseUrl,
        baseUrlWithPort,
        mode,
        user,
        email,
        pass,
        emailService,
        mongoDBUrl,
        secretKey,
        rounds
    }

}