

export default class Service {
    constructor(
        public title: string,
        public description: string,
        public additionalComments: string,
        public price: number[] | number,
        public duration: number,
    ){}
}