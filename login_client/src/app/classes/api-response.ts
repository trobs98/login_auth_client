export class ApiResponse {
    data: any;
    status: string;

    constructor (data: any , status: string) {
        this.data = data;
        this.status = status;
    }
    
    getStatus() {
        return this.status;
    }

    getData() {
        return this.data;
    }
}
