export interface CustomInterface {
    id?: number;
    loaded: boolean;
    loading: boolean;
    submitted: boolean;
    dataToString(): any;
    overwrite(data: any): any;
    reset(): any;
    raw(): any;
};

export abstract class CustomClass implements CustomInterface {
    public id: number;
    public loaded: boolean;
    public loading: boolean;
    public submitted: boolean;

    constructor() { }

    raw():any {
    }

    dataToString() {
    }

    overwrite(data: any): void {
        this.loaded = true;
        this.loading = false;
        this.submitted = false;
    }

    reset(): void {
        this.loaded = false;
        this.loading = true;
        this.submitted = false;
    }
    
}