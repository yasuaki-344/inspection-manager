import { InspectionGroupRepository, InspectionTypeRepository } from '../infrastructure';

export class DIContainer {
  inject(key: string): any {
    console.log(key);
    if (key === 'IInspectionGroupRepository') {
      return new InspectionGroupRepository();
    } else if (key === 'IInspectionTypeRepository') {
      return new InspectionTypeRepository();
    } else {
      throw new Error(`{key} is not registered as dependency`);
    }
  }
}
