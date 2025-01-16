import { CustomClass } from "./custom-class";
import { InstitutionsInterface, RawHistoryInterface } from 'src/app/interfaces/history-class';

export interface RawEntryInterface {
    id?: number;
    title: string;
    comment: string;
    documentURL: string;
    createdAt: Date;
    institutionId: number;
    historyId: number;
    userId: number;
}

export interface EntryInterface {
    id?: number;
    title: string;
    comment: string;
    documentURL: string;
    createdAt: Date;
    institutionId: number;
    historyId: number;
    userId: number;

    History?: RawHistoryInterface;
    Institutions?: InstitutionsInterface;
}

export class EntryClass extends CustomClass implements EntryInterface {
    public override id: number;
    public title: string;
    public comment: string;
    public documentURL: string;
    public createdAt: Date;
    public historyId: number;
    public institutionId: number;
    public userId: number;

    public History: RawHistoryInterface;
    public Institutions: InstitutionsInterface;

    constructor(history?: EntryInterface) {
        super();
        if (history) this.init(history);
        else this.reset();
    }

    init(entry: EntryInterface) {
        this.id = entry.id || 0;
        this.title = entry.title || "";
        this.comment = entry.comment || "";
        this.documentURL = entry.documentURL || "";
        this.createdAt = entry.createdAt || new Date();
        this.historyId = entry.historyId || 0;
        this.institutionId = entry.institutionId || 0;
        this.userId = entry.userId || 0;    

        this.History = entry.History || {
            id: 0,
            historyCode: "",
            documentURL: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            verificationStatusId: 0,
            institutionalPriorityId: 0,
            activityTypeId: 0,
            institutionId: 0,
            userId: 0
        };
        this.Institutions = entry.Institutions || {id: 0, name: ""};
    }

    override reset(): void {
        this.id = -1;
        this.title = "";
        this.comment = "";
        this.documentURL = "";
        this.createdAt = new Date();
        this.historyId = -1;
        this.institutionId = -1;
        this.userId = -1;    

        this.History = {
            id: 0,
            historyCode: "",
            documentURL: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            verificationStatusId: 0,
            institutionalPriorityId: 0,
            activityTypeId: 0,
            institutionId: 0,
            userId: 0
        };
        this.Institutions = {id: -1, name: ""};
    }

    override raw(): RawEntryInterface {
        let data: any = {};
            data.id = this.id;
            data.title = this.title;
            data.comment = this.comment;
            data.documentURL = this.documentURL;
            data.createdAt = this.createdAt;
            data.historyId = this.historyId;
            data.institutionId = this.institutionId;
            data.userId = this.userId;
        return data;
    }

    override dataToString(): void {}

    pretty(): void {}

    valid(): boolean {
        if (
            this.id && 
            this.title && 
            this.comment && 
            this.documentURL && 
            this.createdAt && 
            this.historyId && 
            this.institutionId && 
            this.userId
        ) {
            return true;
        }
        return false;
    }
}