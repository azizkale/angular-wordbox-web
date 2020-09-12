import { Type } from "./type";
import { Group } from "./group";

export class SearcingWord {
    constructor(
        public id: number,
        public type: Type,
        public article: string,
        public word: string,
        public meanings: string[],
        public sampleSentencesInTurkish: string[],
        public sampleSentencesInGerman: string[]
    ) { }
}