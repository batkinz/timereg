export interface TimeSlot {
    id: number;
    date: Date;
    lengthOfWork: number;
    projectName?: string;
    description?: string;
}
