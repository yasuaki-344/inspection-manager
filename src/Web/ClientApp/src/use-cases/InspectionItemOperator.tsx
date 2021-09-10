import { InspectionItem } from '../entities';

/**
 * Initial state of InspectionItem object.
 */
export const InspectionItemInitialState = () => {
  return {
    inspection_item_id: 0,
    inspection_content: '',
    input_type: 0,
    choices: [],
  };
};

/**
 * Checks if the given InspectionItem object is valid or not.
 * @param item InspectionItem object to check.
 * @returns Return true if the item is valid, otherwise false.
 */
export const isValidInspectionItem = (item: InspectionItem): boolean => {
  if (item.inspection_content === '') {
    return false;
  }

  if (item.input_type === 3) {
    if (!item.choices.length) {
      return false;
    } else {
      const descriptions = item.choices.map(x => x.description);
      return !descriptions.includes('');
    }
  }

  return true;
};