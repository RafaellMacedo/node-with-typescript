import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'

const makeSystemUnderTest = (): SignUpController => {
    return new SignUpController()
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const systemUnderTest = makeSystemUnderTest()
        const httpRequest = {
            body: {
                email: 'test@mail.com',
                password: 'password',
                passwordConfirmation: 'password'
            }
        }
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })

    test('Should return 400 if no email is provided', () => {
        const systemUnderTest = makeSystemUnderTest()
        const httpRequest = {
            body: {
                name: 'test',
                password: 'password',
                passwordConfirmation: 'password'
            }
        }
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should return 400 if no password is provided', () => {
        const systemUnderTest = makeSystemUnderTest()
        const httpRequest = {
            body: {
                name: 'test',
                email: 'test@mail.com',
                passwordConfirmation: 'password'
            }
        }
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should return 400 if no password confirmation is provided', () => {
        const systemUnderTest = makeSystemUnderTest()
        const httpRequest = {
            body: {
                name: 'test',
                email: 'test@mail.com',
                password: 'password'
            }
        }
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
    })
})