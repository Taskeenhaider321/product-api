import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schema/auth.schema';
import { UpdateProductDto } from './dto/update-product.dto';

export interface MessageResponse {
  message: string;
  products?: Product[]; 
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) { }

  // This function gets all products or searches based on the query parameters
  async findAll(query: Query): Promise<Product[] | MessageResponse> {
    try {
      const resPerPage = 10;
      const currentPage = Number(query.page) || 1;
      const skip = resPerPage * (currentPage - 1);
      
      // Build search criteria
      const searchCriteria = {};
      if (query.keyword) {
        searchCriteria['$or'] = [
          { title: { $regex: query.keyword, $options: 'i' } },
          { description: { $regex: query.keyword, $options: 'i' } }
        ];
      }
  
      if (query.category) {
        searchCriteria['category'] = { $regex: query.category, $options: 'i' };
      }  
  
      // Fetch products based on search criteria
      const products = await this.productModel
        .find(searchCriteria)
        .limit(resPerPage)
        .skip(skip);
  
      if (products.length === 0) {
        return { message: 'No products found.' };
      }
  
      return { message: 'All products retrieved successfully', products };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching products', error.message);
    }
  }
  
  // This function add product to the database
  async create(product: Product, user: User): Promise<Product> {
    try {
      Object.assign(product, { user: user._id })
      const res = await this.productModel.create(product);
      return res;
    } catch (error) {
      throw new InternalServerErrorException('Error creating product', error.message);
    }
  }

  
  // This function find the product by Id from the database
  async findById(id: string): Promise<Product> {
    try {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Please enter correct id!');
      }
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found.');
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching product by ID', error.message);
    }
  }

  // This function update the product by Id in the database
  async updateById(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      if (!id) {
        throw new NotFoundException('Product not found.');
      }
  
      // Find the existing product
      const existingProduct = await this.productModel.findById(id);
      if (!existingProduct) {
        throw new NotFoundException('Product not found.');
      }
  
      // Update the existing product with the new values
      const updatedProduct = await this.productModel.findByIdAndUpdate(id, {
        $set: {
          name: updateProductDto.name ?? existingProduct.name,
          description: updateProductDto.description ?? existingProduct.description,
          price: updateProductDto.price ?? existingProduct.price,
          category: updateProductDto.category ?? existingProduct.category,
        },
      }, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedProduct) {
        throw new NotFoundException('Product not found.');
      }
      return updatedProduct;
    } catch (error) {
      throw new InternalServerErrorException('Error updating product', error.message);
    }
  }
  

  // This function delete the product by Id from the databse
  async deleteById(id: string): Promise<Product> {
    try {

      if (!mongoose.isValidObjectId(id)) {
        throw new NotFoundException('Invalid product ID.');
      }

      const product = await this.productModel.findByIdAndDelete(id);

      if (!product) {
        throw new NotFoundException('Product not found.');
      }

      return product;
      
    } catch (error) {
      throw new InternalServerErrorException('Error deleting product', error.message);
    }
  }
}
