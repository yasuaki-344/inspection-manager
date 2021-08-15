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
    Option,
    OptionFromJSON,
    OptionFromJSONTyped,
    OptionToJSON,
} from './';

/**
 * 
 * @export
 * @interface ChoiceTemplate
 */
export interface ChoiceTemplate {
    /**
     * 
     * @type {number}
     * @memberof ChoiceTemplate
     */
    choiceTemplateId: number;
    /**
     * 
     * @type {Array<Option>}
     * @memberof ChoiceTemplate
     */
    choices?: Array<Option>;
}

export function ChoiceTemplateFromJSON(json: any): ChoiceTemplate {
    return ChoiceTemplateFromJSONTyped(json, false);
}

export function ChoiceTemplateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChoiceTemplate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'choiceTemplateId': json['choice_template_id'],
        'choices': !exists(json, 'choices') ? undefined : ((json['choices'] as Array<any>).map(OptionFromJSON)),
    };
}

export function ChoiceTemplateToJSON(value?: ChoiceTemplate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'choice_template_id': value.choiceTemplateId,
        'choices': value.choices === undefined ? undefined : ((value.choices as Array<any>).map(OptionToJSON)),
    };
}


