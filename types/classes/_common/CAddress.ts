// address information class
export default class CAddress {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;

    latitude: number = 0;
    longitude: number = 0;
    location?: string;

    toString(): string {
        return `${this.street}, ${this.city}, ${this.state}, ${this.country}, ${this.zip}`;
    }
}
