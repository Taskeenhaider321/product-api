import { validate } from 'class-validator';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Category, Product } from '../schemas/product.schema';

describe('UpdateProductDto', () => {

  it('should fail when name is provided but is empty', async () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '';
    const errors = await validate(updateProductDto);
    expect(errors.length).toBeGreaterThan(0);
    const nameError = errors.find(err => err.property === 'name');
    expect(nameError?.constraints?.isNotEmpty).toBe('Name must not be an empty string if provided.');
  });

  it('should fail when description is provided but is empty', async () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.description = '';
    const errors = await validate(updateProductDto);
    expect(errors.length).toBeGreaterThan(0);
    const descriptionError = errors.find(err => err.property === 'description');
    expect(descriptionError?.constraints?.isNotEmpty).toBe('Description must not be an empty string if provided.');
  });

  it('should fail when price is not a number', async () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.price = 'not-a-number' as any; 
    const errors = await validate(updateProductDto);
    expect(errors.length).toBeGreaterThan(0);
    const priceError = errors.find(err => err.property === 'price');
    expect(priceError?.constraints?.isNumber).toBe('price must be a number conforming to the specified constraints');
  });

  it('should fail when category is invalid', async () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.category = 'invalid-category' as Category;
    const errors = await validate(updateProductDto);
    expect(errors.length).toBeGreaterThan(0);
    const categoryError = errors.find(err => err.property === 'category');
    expect(categoryError?.constraints?.isEnum).toBe('Please enter a correct category.');
  });
});
