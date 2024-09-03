import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../config/guard/jwt-auth.guard';
import { MessageResponse } from './product.service';

@Controller('product')
@ApiTags('Products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // [GET] Get All Products with optional search and filter criteria: "http://localhost:3000/product/all-products"
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @Get('all-products')
  async getAllProducts(
    @Query() query: ExpressQuery,
  ): Promise<Product[] | MessageResponse> {
    return this.productService.findAll(query);
  }

  // [POST] Create/Add Product: "http://localhost:3000/product"
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() product: CreateProductDto,
    @Req() req,
  ): Promise<Product> {
    return this.productService.create(product, req.user);
  }

  // [GET] Get Product By Id: "http://localhost:3000/product/{id}"
  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  // [PUT] Update Product By Id: "http://localhost:3000/product/{id}"
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateProduct(
  @Param('id') id: string,
  @Body() updateProductDto: UpdateProductDto): Promise<Product> {
     return await this.productService.updateById(id, updateProductDto);
  }


  // [DELETE] Delete Product By Id: "http://localhost:3000/product/{id}"
  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.deleteById(id);
  }
}
