// class that stores the notification data
export default class CNotification {
    _id?: string;
    name?: string;
    description?: string;
    content?: string;
    type?: string;

    recivers?: string[];

    owner?: string;

    deleted: boolean = false;
    createdAt: string = new Date().toISOString();
    updatedAt: string = new Date().toISOString();
}
