export class Venta {
    constructor(
        public id:number,
        public user_id: number,
        public total: number,
        public discount: number,
        public status: string
    ){}
}