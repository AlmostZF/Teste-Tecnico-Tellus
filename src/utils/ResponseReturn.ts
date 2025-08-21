export class ReturnData<T> {
    data: T[];

    constructor(data: T[] = []) {
        this.data = data;
    }
}