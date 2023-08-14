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
    })
})