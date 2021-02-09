import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './product.module';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiOkResponse({
    status: 201,
    description: 'Added product successfully',
    type: Product
  })
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc,
    @Body('price') prodPrice: number) {
    const generatedID = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    return { id: generatedID };
  }
  @Get()
  retrieveAllProducts() {
    return this.productsService.fetchProducts();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Product,
  })
  getProduct(@Param('id') prodId: string) {

    return this.productsService.fetchSingleProduct(prodId);
  }

  @Patch(':id')
  @ApiOkResponse({
    status: 200,
    description: 'Patched product by ID successfully',
    type: Product
  })
  @ApiNotFoundResponse({ description: 'No product found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}