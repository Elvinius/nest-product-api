import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiOkResponse({
    status: 201,
    description: 'Added product successfully'
  })
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc,
    @Body('price', ParseIntPipe) prodPrice: number) {
    const generatedID = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    return { id: generatedID };
  }
  @Get()
  async retrieveAllProducts() {
    const products = await this.productsService.fetchProducts();
    return products;
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record'
  })
  getProduct(@Param('id') prodId: string) {
    return this.productsService.fetchSingleProduct(prodId);
  }

  @Patch(':id')
  @ApiOkResponse({
    status: 200,
    description: 'Patched product by ID successfully'
  })
  @ApiNotFoundResponse({ description: 'No product found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price', ParseIntPipe) prodPrice: number) {
    await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}