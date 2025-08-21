import { EquipmentCategory } from "@prisma/client";

export enum Categories {
  NOTEBOOK = 'notebook',
  PROJECTOR  = 'projetor',
  CAMERA = 'camera',
  TOOL = 'ferramenta',
  OTHER = 'outro',
}

export const equipmentToCategoriesMap: Record<EquipmentCategory, Categories> = {
  NOTEBOOK: Categories.NOTEBOOK,
  PROJECTOR: Categories.PROJECTOR,
  CAMERA: Categories.CAMERA,
  TOOL: Categories.TOOL,
  OTHER: Categories.OTHER,
};

export const categoriesToEquipmentMap: Record<Categories, EquipmentCategory> = {
  [Categories.NOTEBOOK]: EquipmentCategory.NOTEBOOK,
  [Categories.PROJECTOR]: EquipmentCategory.PROJECTOR,
  [Categories.CAMERA]: EquipmentCategory.CAMERA,
  [Categories.TOOL]: EquipmentCategory.TOOL,
  [Categories.OTHER]: EquipmentCategory.OTHER,
};
