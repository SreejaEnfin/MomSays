export class CreateCategoryDto {
    categoryName: string;
    categoryDesc?: string;
    minAge: number;
    maxAge: number;
    displayOrder?: number;
    isActive?: boolean;
    imageUrl?: string;
}
