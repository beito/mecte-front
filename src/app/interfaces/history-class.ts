import { CustomClass } from "./custom-class";

export interface VerificationStatusInterface {
    id: number;
    name: string;
}

export interface InstitutionsInterface {
    id: number;
    name: string;
}

export interface ActivityTypeInterface {
    id: number;
    name: string;
}

export interface InstitutionalRegistryInterface {
    id: number;
    name: string;
}

export interface ReducedHistoryInterface {
    id: number;
    historyCode: string;
}

export interface RawHistoryInterface {
    id?: number;
    historyCode: string;
    documentURL: string;
    createdAt: Date;
    updatedAt: Date;
    verificationStatusId: number;
    institutionalPriorityId: number;
    activityTypeId: number;
    institutionId: number;
    userId: number;
}

export interface HistoryInterface {
    id?: number;
    historyCode: string;
    documentURL: string;
    createdAt: Date;
    updatedAt: Date;
    verificationStatusId: number;
    institutionalPriorityId: number;
    activityTypeId: number;
    institutionId: number;
    userId: number;

    VerificationStatus?: VerificationStatusInterface;
    ActivityType?: ActivityTypeInterface;
    Institutions?: InstitutionsInterface;
    InstitutionalPriority?: InstitutionalRegistryInterface;

    formatedCreatedAt?: string;
    formatedUpdatedAt?: string;
}

export class HistoryClass extends CustomClass implements HistoryInterface {
    public override id: number;
    public historyCode: string;
    public documentURL: string;
    public createdAt: Date;
    public updatedAt: Date;
    public verificationStatusId: number;
    public institutionalPriorityId: number;
    public activityTypeId: number;
    public institutionId: number;
    public userId: number;

    public VerificationStatus: VerificationStatusInterface;
    public ActivityType: ActivityTypeInterface;
    public Institutions: InstitutionsInterface;
    public InstitutionalPriority: InstitutionalRegistryInterface;

    public formatedCreatedAt: string;
    public formatedUpdatedAt: string;

    constructor(history?: HistoryInterface) {
        super();
        if (history) this.init(history);
        else this.reset();
    }

    init(history: HistoryInterface) {
        this.id = history.id || 0;
        this.historyCode = history.historyCode || "";
        this.documentURL = history.documentURL || "";
        this.createdAt = history.createdAt || new Date();
        this.updatedAt = history.updatedAt || new Date();
        this.verificationStatusId = history.verificationStatusId || 0;
        this.institutionalPriorityId = history.institutionalPriorityId || 0;
        this.activityTypeId = history.activityTypeId || 0;
        this.institutionId = history.institutionId || 0;
        this.userId = history.userId || 0;    

        this.VerificationStatus = history.VerificationStatus || {id: 0, name: ""};
        this.ActivityType = history.ActivityType || {id: 0, name: ""};
        this.Institutions = history.Institutions || {id: 0, name: ""};
        this.InstitutionalPriority = history.InstitutionalPriority || {id: 0, name: ""};

        this.formatedCreatedAt = history.formatedCreatedAt || "";
        this.formatedUpdatedAt = history.formatedUpdatedAt || "";
    }

    override reset(): void {
        this.id = -1;
        this.historyCode = "";
        this.documentURL = "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.verificationStatusId = -1;
        this.institutionalPriorityId = -1;
        this.activityTypeId = -1;
        this.institutionId = -1;
        this.userId = -1;    

        this.VerificationStatus = {id: -1, name: ""};
        this.ActivityType = {id: -1, name: ""};
        this.Institutions = {id: -1, name: ""};
        this.InstitutionalPriority = {id: -1, name: ""};

        this.formatedCreatedAt = "";
        this.formatedUpdatedAt = "";
    }

    override raw(): RawHistoryInterface {
        let data: any = {};
            data.id = this.id;
            data.historyCode = this.historyCode;
            data.documentURL = this.documentURL;
            data.createdAt = this.createdAt;
            data.updatedAt = this.updatedAt;
            data.verificationStatusId = this.verificationStatusId;
            data.institutionalPriorityId = this.institutionalPriorityId;
            data.activityTypeId = this.activityTypeId;
            data.institutionId = this.institutionId;
            data.userId = this.userId;
        return data;
    }

    override dataToString(): void {}

    pretty(): void {}

    valid(): boolean {
        if (
            this.id && 
            this.historyCode && 
            this.documentURL && 
            this.createdAt && 
            this.updatedAt && 
            this.verificationStatusId && 
            this.institutionalPriorityId && 
            this.activityTypeId && 
            this.institutionId && 
            this.userId
        ) {
            return true;
        }
        return false;
    }
}