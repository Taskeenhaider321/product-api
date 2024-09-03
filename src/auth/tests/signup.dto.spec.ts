import { validate } from 'class-validator';
import { SignUpAuthDto } from '../dto/signup-auth.dto';

describe('SignUpAuthDto', () => {
  it('should require name, email, and password', async () => {
    const signupDto = new SignUpAuthDto();

    const errors = await validate(signupDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.find(error => error.property === 'name')).toBeDefined();
    expect(errors.find(error => error.property === 'email')).toBeDefined();
    expect(errors.find(error => error.property === 'password')).toBeDefined();
  });

  it('should validate email format correctly', async () => {
    const signupDto = new SignUpAuthDto();
    signupDto.name = 'Test User';
    signupDto.email = 'invalid-email';
    signupDto.password = 'Password123!';

    const errors = await validate(signupDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.find(error => error.property === 'email')).toBeDefined();
  });

  it('should validate password rules correctly', async () => {
    const signupDto = new SignUpAuthDto();
    signupDto.name = 'Test User';
    signupDto.email = 'test@example.com';
    signupDto.password = 'password';

    const errors = await validate(signupDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.find(error => error.property === 'password')).toBeDefined();
  });

  it('should pass validation with correct name, email, and password', async () => {
    const signupDto = new SignUpAuthDto();
    signupDto.name = 'Test User';
    signupDto.email = 'test@example.com';
    signupDto.password = 'Password123!';

    const errors = await validate(signupDto);
    expect(errors.length).toBe(0);
  });
});
