import { IsEnum } from "class-validator";
import { Categories } from "src/enums/Categories";

export class FilterCategoryDto {
    @IsEnum(Categories, { message: 'Invalid equipment category' })
    category: Categories;

    constructor(category: Categories) {
        this.category = category;
    }
}