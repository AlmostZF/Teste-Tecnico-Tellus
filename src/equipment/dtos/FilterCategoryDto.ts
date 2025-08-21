import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Categories } from "../../enums/Categories";

export class FilterCategoryDto {
    @IsEnum(Categories, { message: 'Invalid equipment category' })
    @ApiProperty({ 
        enum: Categories, 
        example: Categories.TOOL, 
        description: 'Equipment category' 
    })
    category: Categories;

    constructor(category: Categories) {
        this.category = category;
    }
}