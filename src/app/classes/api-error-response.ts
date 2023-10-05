import { HttpHeaders } from "@angular/common/http";

export class ApiErrorResponse {
    status: string;
    statusMessage: string;
    statusCode: string;
    statusName: string;
    headers: HttpHeaders;
    url: string | null;

    constructor (status: string, statusMessage: string, statusCode: string, statusName: string, headers: HttpHeaders, url: string | null) {
        this.status = status;
        this.statusMessage = statusMessage;
        this.statusCode = statusCode;
        this.statusName = statusName;
        this.headers = headers;
        this.url = url;
    }
}
