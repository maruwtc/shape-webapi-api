import bcrypt from 'bcrypt'

export const hashedPassword = ( password: any) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}