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
 * ChoiceTemplatesApi - interface
 * 
 * @export
 * @interface ChoiceTemplatesApiInterface
 */
export interface ChoiceTemplatesApiInterface {
    /**
     * Returns an array of ChoiceTemplate model
     * @summary Get all choice templates.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChoiceTemplatesApiInterface
     */
    choiceTemplatesGetRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ChoiceTemplate>>>;

    /**
     * Returns an array of ChoiceTemplate model
     * Get all choice templates.
     */
    choiceTemplatesGet(initOverrides?: RequestInit): Promise<Array<ChoiceTemplate>>;

    /**
     * 
     * @summary Deletes a ChoiceTemplate
     * @param {number} id choice template ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChoiceTemplatesApiInterface
     */
    choiceTemplatesIdDeleteRaw(requestParameters: ChoiceTemplatesIdDeleteRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ChoiceTemplate>>;

    /**
     * Deletes a ChoiceTemplate
     */
    choiceTemplatesIdDelete(requestParameters: ChoiceTemplatesIdDeleteRequest, initOverrides?: RequestInit): Promise<ChoiceTemplate>;

    /**
     * Returns a single ChoiceTemplate model
     * @summary Get choiceTemplate by ID.
     * @param {number} id choice template ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChoiceTemplatesApiInterface
     */
    choiceTemplatesIdGetRaw(requestParameters: ChoiceTemplatesIdGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ChoiceTemplate>>>;

    /**
     * Returns a single ChoiceTemplate model
     * Get choiceTemplate by ID.
     */
    choiceTemplatesIdGet(requestParameters: ChoiceTemplatesIdGetRequest, initOverrides?: RequestInit): Promise<Array<ChoiceTemplate>>;

    /**
     * 
     * @summary Updates a ChoiceTemplate
     * @param {number} id choice template ID
     * @param {ChoiceTemplate} [choiceTemplate] choice template to update
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChoiceTemplatesApiInterface
     */
    choiceTemplatesIdPutRaw(requestParameters: ChoiceTemplatesIdPutRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ChoiceTemplate>>;

    /**
     * Updates a ChoiceTemplate
     */
    choiceTemplatesIdPut(requestParameters: ChoiceTemplatesIdPutRequest, initOverrides?: RequestInit): Promise<ChoiceTemplate>;

    /**
     * Create a new ChoiceTemplate
     * @summary Create a new ChoiceTemplate
     * @param {ChoiceTemplate} [choiceTemplate] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChoiceTemplatesApiInterface
     */
    choiceTemplatesPostRaw(requestParameters: ChoiceTemplatesPostRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ChoiceTemplate>>;

    /**
     * Create a new ChoiceTemplate
     * Create a new ChoiceTemplate
     */
    choiceTemplatesPost(requestParameters: ChoiceTemplatesPostRequest, initOverrides?: RequestInit): Promise<ChoiceTemplate>;

}

/**
 * 
 */
export class ChoiceTemplatesApi extends runtime.BaseAPI implements ChoiceTemplatesApiInterface {

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
