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


import * as runtime from '../runtime';
import {
    ChoiceTemplate,
    ChoiceTemplateFromJSON,
    ChoiceTemplateToJSON,
} from '../models';

export interface ChoiceTemplatesChoiceTemplateIdDeleteRequest {
    choiceTemplateId: number;
}

export interface ChoiceTemplatesChoiceTemplateIdGetRequest {
    choiceTemplateId: number;
}

export interface ChoiceTemplatesChoiceTemplateIdPutRequest {
    choiceTemplateId: number;
}

export interface ChoiceTemplatesPostRequest {
    choiceTemplate?: ChoiceTemplate;
}

/**
 * 
 */
export class ChoiceTemplatesApi extends runtime.BaseAPI {

    /**
     * Deletes a ChoiceTemplate
     */
    async choiceTemplatesChoiceTemplateIdDeleteRaw(requestParameters: ChoiceTemplatesChoiceTemplateIdDeleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.choiceTemplateId === null || requestParameters.choiceTemplateId === undefined) {
            throw new runtime.RequiredError('choiceTemplateId','Required parameter requestParameters.choiceTemplateId was null or undefined when calling choiceTemplatesChoiceTemplateIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/choice-templates/{choiceTemplateId}`.replace(`{${"choiceTemplateId"}}`, encodeURIComponent(String(requestParameters.choiceTemplateId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes a ChoiceTemplate
     */
    async choiceTemplatesChoiceTemplateIdDelete(requestParameters: ChoiceTemplatesChoiceTemplateIdDeleteRequest): Promise<void> {
        await this.choiceTemplatesChoiceTemplateIdDeleteRaw(requestParameters);
    }

    /**
     * Returns a single ChoiceTemplate model
     * Get choiceTemplate by ID.
     */
    async choiceTemplatesChoiceTemplateIdGetRaw(requestParameters: ChoiceTemplatesChoiceTemplateIdGetRequest): Promise<runtime.ApiResponse<Array<ChoiceTemplate>>> {
        if (requestParameters.choiceTemplateId === null || requestParameters.choiceTemplateId === undefined) {
            throw new runtime.RequiredError('choiceTemplateId','Required parameter requestParameters.choiceTemplateId was null or undefined when calling choiceTemplatesChoiceTemplateIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/choice-templates/{choiceTemplateId}`.replace(`{${"choiceTemplateId"}}`, encodeURIComponent(String(requestParameters.choiceTemplateId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ChoiceTemplateFromJSON));
    }

    /**
     * Returns a single ChoiceTemplate model
     * Get choiceTemplate by ID.
     */
    async choiceTemplatesChoiceTemplateIdGet(requestParameters: ChoiceTemplatesChoiceTemplateIdGetRequest): Promise<Array<ChoiceTemplate>> {
        const response = await this.choiceTemplatesChoiceTemplateIdGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a ChoiceTemplate
     */
    async choiceTemplatesChoiceTemplateIdPutRaw(requestParameters: ChoiceTemplatesChoiceTemplateIdPutRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.choiceTemplateId === null || requestParameters.choiceTemplateId === undefined) {
            throw new runtime.RequiredError('choiceTemplateId','Required parameter requestParameters.choiceTemplateId was null or undefined when calling choiceTemplatesChoiceTemplateIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/choice-templates/{choiceTemplateId}`.replace(`{${"choiceTemplateId"}}`, encodeURIComponent(String(requestParameters.choiceTemplateId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates a ChoiceTemplate
     */
    async choiceTemplatesChoiceTemplateIdPut(requestParameters: ChoiceTemplatesChoiceTemplateIdPutRequest): Promise<void> {
        await this.choiceTemplatesChoiceTemplateIdPutRaw(requestParameters);
    }

    /**
     * Returns an array of ChoiceTemplate model
     * Get all choice templates.
     */
    async choiceTemplatesGetRaw(): Promise<runtime.ApiResponse<Array<ChoiceTemplate>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/choice-templates`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ChoiceTemplateFromJSON));
    }

    /**
     * Returns an array of ChoiceTemplate model
     * Get all choice templates.
     */
    async choiceTemplatesGet(): Promise<Array<ChoiceTemplate>> {
        const response = await this.choiceTemplatesGetRaw();
        return await response.value();
    }

    /**
     * Create a new ChoiceTemplate
     * Create a new ChoiceTemplate
     */
    async choiceTemplatesPostRaw(requestParameters: ChoiceTemplatesPostRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/choice-templates`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ChoiceTemplateToJSON(requestParameters.choiceTemplate),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create a new ChoiceTemplate
     * Create a new ChoiceTemplate
     */
    async choiceTemplatesPost(requestParameters: ChoiceTemplatesPostRequest): Promise<void> {
        await this.choiceTemplatesPostRaw(requestParameters);
    }

}
