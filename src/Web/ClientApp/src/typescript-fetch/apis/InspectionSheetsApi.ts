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
    InspectionSheet,
    InspectionSheetFromJSON,
    InspectionSheetToJSON,
} from '../models';

export interface InspectionSheetsPostRequest {
    inspectionSheet?: InspectionSheet;
}

export interface InspectionSheetsSheetIdDeleteRequest {
    sheetId: number;
}

export interface InspectionSheetsSheetIdGetRequest {
    sheetId: number;
}

export interface InspectionSheetsSheetIdPutRequest {
    sheetId: number;
    inspectionSheet?: InspectionSheet;
}

/**
 * InspectionSheetsApi - interface
 * 
 * @export
 * @interface InspectionSheetsApiInterface
 */
export interface InspectionSheetsApiInterface {
    /**
     * 
     * @summary Get all inspection sheets.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InspectionSheetsApiInterface
     */
    inspectionSheetsGetRaw(): Promise<runtime.ApiResponse<Array<InspectionSheet>>>;

    /**
     * Get all inspection sheets.
     */
    inspectionSheetsGet(): Promise<Array<InspectionSheet>>;

    /**
     * 
     * @summary Create a new InspectionSheet model
     * @param {InspectionSheet} [inspectionSheet] inspection sheet to create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InspectionSheetsApiInterface
     */
    inspectionSheetsPostRaw(requestParameters: InspectionSheetsPostRequest): Promise<runtime.ApiResponse<InspectionSheet>>;

    /**
     * Create a new InspectionSheet model
     */
    inspectionSheetsPost(requestParameters: InspectionSheetsPostRequest): Promise<InspectionSheet>;

    /**
     * 
     * @summary Deletes the InspectionSheet model.
     * @param {number} sheetId inspection sheet ID to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InspectionSheetsApiInterface
     */
    inspectionSheetsSheetIdDeleteRaw(requestParameters: InspectionSheetsSheetIdDeleteRequest): Promise<runtime.ApiResponse<void>>;

    /**
     * Deletes the InspectionSheet model.
     */
    inspectionSheetsSheetIdDelete(requestParameters: InspectionSheetsSheetIdDeleteRequest): Promise<void>;

    /**
     * 
     * @summary Get the specified inspection sheet.
     * @param {number} sheetId inspection sheet ID to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InspectionSheetsApiInterface
     */
    inspectionSheetsSheetIdGetRaw(requestParameters: InspectionSheetsSheetIdGetRequest): Promise<runtime.ApiResponse<InspectionSheet>>;

    /**
     * Get the specified inspection sheet.
     */
    inspectionSheetsSheetIdGet(requestParameters: InspectionSheetsSheetIdGetRequest): Promise<InspectionSheet>;

    /**
     * 
     * @summary Updates the InspectionSheet model.
     * @param {number} sheetId inspection sheet ID to update
     * @param {InspectionSheet} [inspectionSheet] inspection sheet to update
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InspectionSheetsApiInterface
     */
    inspectionSheetsSheetIdPutRaw(requestParameters: InspectionSheetsSheetIdPutRequest): Promise<runtime.ApiResponse<InspectionSheet>>;

    /**
     * Updates the InspectionSheet model.
     */
    inspectionSheetsSheetIdPut(requestParameters: InspectionSheetsSheetIdPutRequest): Promise<InspectionSheet>;

}

/**
 * 
 */
export class InspectionSheetsApi extends runtime.BaseAPI implements InspectionSheetsApiInterface {

    /**
     * Get all inspection sheets.
     */
    async inspectionSheetsGetRaw(): Promise<runtime.ApiResponse<Array<InspectionSheet>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/inspection-sheets`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(InspectionSheetFromJSON));
    }

    /**
     * Get all inspection sheets.
     */
    async inspectionSheetsGet(): Promise<Array<InspectionSheet>> {
        const response = await this.inspectionSheetsGetRaw();
        return await response.value();
    }

    /**
     * Create a new InspectionSheet model
     */
    async inspectionSheetsPostRaw(requestParameters: InspectionSheetsPostRequest): Promise<runtime.ApiResponse<InspectionSheet>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/inspection-sheets`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InspectionSheetToJSON(requestParameters.inspectionSheet),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InspectionSheetFromJSON(jsonValue));
    }

    /**
     * Create a new InspectionSheet model
     */
    async inspectionSheetsPost(requestParameters: InspectionSheetsPostRequest): Promise<InspectionSheet> {
        const response = await this.inspectionSheetsPostRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes the InspectionSheet model.
     */
    async inspectionSheetsSheetIdDeleteRaw(requestParameters: InspectionSheetsSheetIdDeleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.sheetId === null || requestParameters.sheetId === undefined) {
            throw new runtime.RequiredError('sheetId','Required parameter requestParameters.sheetId was null or undefined when calling inspectionSheetsSheetIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/inspection-sheets/{sheet_id}`.replace(`{${"sheet_id"}}`, encodeURIComponent(String(requestParameters.sheetId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes the InspectionSheet model.
     */
    async inspectionSheetsSheetIdDelete(requestParameters: InspectionSheetsSheetIdDeleteRequest): Promise<void> {
        await this.inspectionSheetsSheetIdDeleteRaw(requestParameters);
    }

    /**
     * Get the specified inspection sheet.
     */
    async inspectionSheetsSheetIdGetRaw(requestParameters: InspectionSheetsSheetIdGetRequest): Promise<runtime.ApiResponse<InspectionSheet>> {
        if (requestParameters.sheetId === null || requestParameters.sheetId === undefined) {
            throw new runtime.RequiredError('sheetId','Required parameter requestParameters.sheetId was null or undefined when calling inspectionSheetsSheetIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/inspection-sheets/{sheet_id}`.replace(`{${"sheet_id"}}`, encodeURIComponent(String(requestParameters.sheetId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InspectionSheetFromJSON(jsonValue));
    }

    /**
     * Get the specified inspection sheet.
     */
    async inspectionSheetsSheetIdGet(requestParameters: InspectionSheetsSheetIdGetRequest): Promise<InspectionSheet> {
        const response = await this.inspectionSheetsSheetIdGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates the InspectionSheet model.
     */
    async inspectionSheetsSheetIdPutRaw(requestParameters: InspectionSheetsSheetIdPutRequest): Promise<runtime.ApiResponse<InspectionSheet>> {
        if (requestParameters.sheetId === null || requestParameters.sheetId === undefined) {
            throw new runtime.RequiredError('sheetId','Required parameter requestParameters.sheetId was null or undefined when calling inspectionSheetsSheetIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/inspection-sheets/{sheet_id}`.replace(`{${"sheet_id"}}`, encodeURIComponent(String(requestParameters.sheetId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: InspectionSheetToJSON(requestParameters.inspectionSheet),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InspectionSheetFromJSON(jsonValue));
    }

    /**
     * Updates the InspectionSheet model.
     */
    async inspectionSheetsSheetIdPut(requestParameters: InspectionSheetsSheetIdPutRequest): Promise<InspectionSheet> {
        const response = await this.inspectionSheetsSheetIdPutRaw(requestParameters);
        return await response.value();
    }

}