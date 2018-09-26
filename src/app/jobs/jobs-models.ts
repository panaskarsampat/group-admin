export class JobsModels {
    JobId: number;
    JobCode: string;
    JobName: string;
    JobTitle: string;    
    ContactPerson: string;
    IsActive: boolean;
    JobDesc : string;
    PostalCode: string;
    WorkExp: number;
    WorkSkills: string;

    LocationCountryId: number;
    LocationStateId: number;
    LocationCityId: number;    
    CompanyId: number;
    PositionId: number;
    WorkId: number;
    
    CreatedBy: string;
    CreatedDateTime: string;
    ModifiedBy : string;
    ModifiedDateTime : string;
}
