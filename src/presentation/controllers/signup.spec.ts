import { SignUpController } from './signup'

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const systemUnderTest = new SignUpController();
        const httpRequest = {
            body: {
                email: 'test@mail.com',
                password: 'password',
                passwordConfirmation: 'password'
            }
        }
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error('Missing param: name'))
    })

    test('Should return 400 if no email is provided', () => {
        const systemUnderTest = new SignUpController();
        const httpRequest = {
            body: {
                name: 'test',
                password: 'password',
                passwordConfirmation: 'password'
            }
        }
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error('Missing param: email'))
    })
})