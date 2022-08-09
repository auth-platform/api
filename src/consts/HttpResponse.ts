export class HttpResponse {
    constructor(success: boolean, data?: any) {
        this.success = success;
        this.data = data;
    }

    success: boolean;
    data: any;
}