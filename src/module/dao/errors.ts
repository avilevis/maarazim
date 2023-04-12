export class AlreadyExist extends Error {
    status: number | null = null

    constructor(message: string) {
        super(message);
        this.name = "AlreadyExist";
        this.status = 403
    }
}

export class NotExist extends Error {
    status: number | null = null

    constructor(message: string) {
        super(message);
        this.name = "NotExist";
        this.status = 404
    }
}