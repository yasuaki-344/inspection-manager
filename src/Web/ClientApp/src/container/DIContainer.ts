import { InspectionGroupRepository, InspectionTypeRepository } from '../infrastructure';

export class DIContainer {
  inject<T>(key: string): T {
    if (key === 'InspectionGroupRepository') {
      return new InspectionGroupRepository() as unknown as T;
    } else if (key === 'InspectionTypeRepository') {
      return new InspectionTypeRepository() as unknown as T;
    } else {
      throw new Error(`{key} is not registered as dependency`);
    }
  }
}
