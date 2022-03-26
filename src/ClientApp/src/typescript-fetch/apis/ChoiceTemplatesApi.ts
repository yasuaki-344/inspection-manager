/* tslint:disable */
/* eslint-disable */
/**
 * Open API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ChoiceTemplate,
    ChoiceTemplateFromJSON,
    ChoiceTemplateToJSON,
} from '../models';

export interface ChoiceTemplatesIdDeleteRequest {
    id: number;
}

export interface ChoiceTemplatesIdGetRequest {
    id: number;
}

export interface ChoiceTemplatesIdPutRequest {
    id: number;
    choiceTemplate?: ChoiceTemplate;
}

export interface ChoiceTemplatesPostRequest {
    choiceTemplate?: ChoiceTemplate;
}

/**
 * 
 */
export class ChoiceTemplatesApi extends runtime.BaseAPI {

    /**
     * Returns an array of ChoiceTemplate model
     * Get all choice templates.
     */
    async choiceTemplatesGetRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ChoiceTemplate>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/choice-templates`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ChoiceTemplateFromJSON));
    }

    /**
     * Returns an array of ChoiceTemplate model
     * Get all choice templates.
     */
    async choiceTemplatesGet(initOverrides?: RequestInit): Promise<Array<ChoiceTemplate>> {
        const response = await this.choiceTemplatesGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Deletes a ChoiceTemplate
     */
    async choiceTemplatesIdDeleteRaw(requestParameters: ChoiceTemplatesIdDeleteRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ChoiceTemplate>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling choiceTemplatesIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/choice-templates/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChoiceTemplateFromJSON(jsonValue));
    }

    /**
     * Deletes a ChoiceTemplate
     */
    async choiceTemplatesIdDelete(requestParameters: ChoiceTemplatesIdDeleteRequest, initOverrides?: RequestInit): Promise<ChoiceTemplate> {
        const response = await this.choiceTemplatesIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns a single ChoiceTemplate model
     * Get choiceTemplate by ID.
     */
    async choiceTemplatesIdGetRaw(requestParameters: ChoiceTemplatesIdGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ChoiceTemplate>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling choiceTemplatesIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/choice-templates/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ChoiceTemplateFromJSON));
    }

    /**
     * Returns a single ChoiceTemplate model
     * Get choiceTemplate by ID.
     */
    async choiceTemplatesIdGet(requestParameters: ChoiceTemplatesIdGetRequest, initOverrides?: RequestInit): Promise<Array<ChoiceTemplate>> {
        const response = await this.choiceTemplatesIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Updates a ChoiceTemplate
     */
    async choiceTemplatesIdPutRaw(requestParameters: ChoiceTemplatesIdPutRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ChoiceTemplate>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling choiceTemplatesIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/choice-templates/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ChoiceTemplateToJSON(requestParameters.choiceTemplate),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChoiceTemplateFromJSON(jsonValue));
    }

    /**
     * Updates a ChoiceTemplate
     */
    async choiceTemplatesIdPut(requestParameters: ChoiceTemplatesIdPutRequest, initOverrides?: RequestInit): Promise<ChoiceTemplate> {
        const response = await this.choiceTemplatesIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a new ChoiceTemplate
     * Create a new ChoiceTemplate
     */
    async choiceTemplatesPostRaw(requestParameters: ChoiceTemplatesPostRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ChoiceTemplate>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/choice-templates`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ChoiceTemplateToJSON(requestParameters.choiceTemplate),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChoiceTemplateFromJSON(jsonValue));
    }

    /**
     * Create a new ChoiceTemplate
     * Create a new ChoiceTemplate
     */
    async choiceTemplatesPost(requestParameters: ChoiceTemplatesPostRequest = {}, initOverrides?: RequestInit): Promise<ChoiceTemplate> {
        const response = await this.choiceTemplatesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
