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
    InspectionGroup,
    InspectionGroupFromJSON,
    InspectionGroupToJSON,
} from '../models';

export interface InspectionGroupsIdDeleteRequest {
    id: number;
}

export interface InspectionGroupsIdGetRequest {
    id: number;
}

export interface InspectionGroupsIdPutRequest {
    id: number;
    inspectionGroup?: InspectionGroup;
}

export interface InspectionGroupsPostRequest {
    inspectionGroup?: InspectionGroup;
}

/**
 * 
 */
export class InspectionGroupsApi extends runtime.BaseAPI {

    /**
     * Get all inspection groups.
     */
    async inspectionGroupsGetRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<InspectionGroup>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/inspection-groups`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(InspectionGroupFromJSON));
    }

    /**
     * Get all inspection groups.
     */
    async inspectionGroupsGet(initOverrides?: RequestInit): Promise<Array<InspectionGroup>> {
        const response = await this.inspectionGroupsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Deletes the InspectionGroup model.
     */
    async inspectionGroupsIdDeleteRaw(requestParameters: InspectionGroupsIdDeleteRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<InspectionGroup>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling inspectionGroupsIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/inspection-groups/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InspectionGroupFromJSON(jsonValue));
    }

    /**
     * Deletes the InspectionGroup model.
     */
    async inspectionGroupsIdDelete(requestParameters: InspectionGroupsIdDeleteRequest, initOverrides?: RequestInit): Promise<InspectionGroup> {
        const response = await this.inspectionGroupsIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get InspectionGroup model by ID.
     */
    async inspectionGroupsIdGetRaw(requestParameters: InspectionGroupsIdGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<InspectionGroup>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling inspectionGroupsIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/inspection-groups/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InspectionGroupFromJSON(jsonValue));
    }

    /**
     * Get InspectionGroup model by ID.
     */
    async inspectionGroupsIdGet(requestParameters: InspectionGroupsIdGetRequest, initOverrides?: RequestInit): Promise<InspectionGroup> {
        const response = await this.inspectionGroupsIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Updates the InspectionGroup model.
     */
    async inspectionGroupsIdPutRaw(requestParameters: InspectionGroupsIdPutRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<InspectionGroup>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling inspectionGroupsIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/inspection-groups/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: InspectionGroupToJSON(requestParameters.inspectionGroup),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InspectionGroupFromJSON(jsonValue));
    }

    /**
     * Updates the InspectionGroup model.
     */
    async inspectionGroupsIdPut(requestParameters: InspectionGroupsIdPutRequest, initOverrides?: RequestInit): Promise<InspectionGroup> {
        const response = await this.inspectionGroupsIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a new InspectionGroup model
     */
    async inspectionGroupsPostRaw(requestParameters: InspectionGroupsPostRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<InspectionGroup>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/inspection-groups`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InspectionGroupToJSON(requestParameters.inspectionGroup),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InspectionGroupFromJSON(jsonValue));
    }

    /**
     * Create a new InspectionGroup model
     */
    async inspectionGroupsPost(requestParameters: InspectionGroupsPostRequest = {}, initOverrides?: RequestInit): Promise<InspectionGroup> {
        const response = await this.inspectionGroupsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
