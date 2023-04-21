// class that stores time span
export default class CTime {
    starttime: string = new Date().toISOString();
    endtime: string = new Date().toISOString();
    timezone?: string;
}
