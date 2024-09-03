import { validate } from 'class-validator';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category } from '../schemas/product.schema';

describe('CreateProductDto', () => {
  let createProductDto: CreateProductDto;

  beforeEach(() => {
    createProductDto = new CreateProductDto();
    createProductDto.name = 'Test Product';
    createProductDto.description = 'This is a test product.';
    createProductDto.price = 100;
    createProductDto.category = Category.ELECTRONICS;
  });

  it('should succeed with valid data', async () => {
    const errors = await validate(createProductDto);
    expect(errors.length).toBe(0);
  });

  it('should fail when name is missing', async () => {
    createProductDto.name = '';
    const errors = await validate(createProductDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isNotEmpty).toBe('name should not be empty');
  });

  it('should fail when description is missing', async () => {
    createProductDto.description = '';
    const errors = await validate(createProductDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isNotEmpty).toBe('description should not be empty');
  });

  it('should fail when price is missing', async () => {
    createProductDto.price = null;
    const errors = await validate(createProductDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isNotEmpty).toBe('price should not be empty');
  });

  it('should fail when category is invalid', async () => {
    createProductDto.category = 'INVALID_CATEGORY' as Category;
    const errors = await validate(createProductDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isEnum).toBe('Please enter correct category.');
  });
});
