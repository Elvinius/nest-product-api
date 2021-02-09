import { ApiProperty } from "@nestjs/swagger";

export class Product {
    constructor(public id: string, public title: string, public description: string, public price: number) {
    };
    @ApiProperty()
    prodId: string;

    @ApiProperty()
    prodTitle: string;

    @ApiProperty()
    prodDesc: string;

    @ApiProperty()
    prodPrice: number;
}  