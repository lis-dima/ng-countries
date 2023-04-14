export class Country {
    id: string = "";
    name: string = "";

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }

    public toStr(): string {
        return `{"id":${this.id},"name":"${this.name}"}`;
    }
}