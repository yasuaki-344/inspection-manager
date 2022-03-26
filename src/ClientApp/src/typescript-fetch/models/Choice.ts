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
/**
 * 
 * @export
 * @interface Choice
 */
export interface Choice {
    /**
     * 
     * @type {number}
     * @memberof Choice
     */
    choiceId: number;
    /**
     * 
     * @type {number}
     * @memberof Choice
     */
    orderIndex: number;
    /**
     * 
     * @type {string}
     * @memberof Choice
     */
    description: string;
}

export function ChoiceFromJSON(json: any): Choice {
    return ChoiceFromJSONTyped(json, false);
}

export function ChoiceFromJSONTyped(json: any, ignoreDiscriminator: boolean): Choice {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'choiceId': json['choice_id'],
        'orderIndex': json['order_index'],
        'description': json['description'],
    };
}

export function ChoiceToJSON(value?: Choice | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'choice_id': value.choiceId,
        'order_index': value.orderIndex,
        'description': value.description,
    };
}

