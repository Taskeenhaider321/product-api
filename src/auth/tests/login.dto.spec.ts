import { validate } from 'class-validator';
import { LoginDto } from '../dto/login-auth.dto';

describe('LoginDto', () => {
  it('should validate email correctly', async () => {
    const loginDto = new LoginDto();
    loginDto.email = 'invalid-email';
    loginDto.password = 'Password123!';

    const errors = await validate(loginDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isEmail).toEqual('Please enter a correct email');
  });

  it('should validate password length correctly', async () => {
    const loginDto = new LoginDto();
    loginDto.email = 'test@example.com';
    loginDto.password = 'short';

    const errors = await validate(loginDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.minLength).toEqual('Password must be atleast 8 characters long');
  });

  it('should pass validation with correct email and password', async () => {
    const loginDto = new LoginDto();
    loginDto.email = 'test@example.com';
    loginDto.password = 'Password123!';

    const errors = await validate(loginDto);
    expect(errors.length).toBe(0);
  });
});
