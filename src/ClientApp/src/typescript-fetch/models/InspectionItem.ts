/* tslint:disable */
/* eslint-disable */
/**
 * API Specification
 * クライアント-サーバー間のデータ通信仕様
 *
 * The version of the OpenAPI document: 0.4.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Choice,
    ChoiceFromJSON,
    ChoiceFromJSONTyped,
    ChoiceToJSON,
} from './Choice';

/**
 * 
 * @export
 * @interface InspectionItem
 */
export interface InspectionItem {
    /**
     * 
     * @type {number}
     * @memberof InspectionItem
     */
    inspectionItemId: number;
    /**
     * 
     * @type {number}
     * @memberof InspectionItem
     */
    orderIndex: number;
    /**
     * 
     * @type {string}
     * @memberof InspectionItem
     */
    inspectionContent: string;
    /**
     * 
     * @type {number}
     * @memberof InspectionItem
     */
    inputType: number;
    /**
     * 
     * @type {Array<Choice>}
     * @memberof InspectionItem
     */
    choices?: Array<Choice>;
}

export function InspectionItemFromJSON(json: any): InspectionItem {
    return InspectionItemFromJSONTyped(json, false);
}

export function InspectionItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): InspectionItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'inspectionItemId': json['inspection_item_id'],
        'orderIndex': json['order_index'],
        'inspectionContent': json['inspection_content'],
        'inputType': json['input_type'],
        'choices': !exists(json, 'choices') ? undefined : ((json['choices'] as Array<any>).map(ChoiceFromJSON)),
    };
}

export function InspectionItemToJSON(value?: InspectionItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'inspection_item_id': value.inspectionItemId,
        'order_index': value.orderIndex,
        'inspection_content': value.inspectionContent,
        'input_type': value.inputType,
        'choices': value.choices === undefined ? undefined : ((value.choices as Array<any>).map(ChoiceToJSON)),
    };
}

