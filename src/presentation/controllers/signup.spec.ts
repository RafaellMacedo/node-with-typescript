import { InvalidParamError } from '../errors/invalid-param-error copy'
import { MissingParamError } from '../errors/missing-param-error'
import { EmailValidator } from '../protocols/email-validator'
import { SignUpController } from './signup'

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
}

const makeSystemUnderTest = (): SutTypes => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)
    return {
        sut,
        emailValidatorStub
    }
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const { sut } = makeSystemUnderTest()
        const httpRequest = {
            body: {
                email: 'test@mail.com',
                password: 'password',
                passwordConfirmation: 'password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })

    test('Should return 400 if no email is provided', () => {
        const { sut } = makeSystemUnderTest()
        const httpRequest = {
            body: {
                name: 'test',
                password: 'password',
                passwordConfirmation: 'password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should return 400 if no password is provided', () => {
        const { sut } = makeSystemUnderTest()
        const httpRequest = {
            body: {
                name: 'test',
                email: 'test@mail.com',
                passwordConfirmation: 'password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should return 400 if no password confirmation is provided', () => {
        const { sut } = makeSystemUnderTest()
        const httpRequest = {
            body: {
                name: 'test',
                email: 'test@mail.com',
                password: 'password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
    })

    test('Should return 400 if an invalid email is provided', () => {
        const { sut, emailValidatorStub } = makeSystemUnderTest()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpRequest = {
            body: {
                name: 'test',
                email: 'invalid_test@mail.com',
                password: 'password',
                passwordConfirmation: 'password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })
})