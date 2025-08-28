export type Child = {
    id: string;
    name: string;
    alias: string;
    age: number;
    language: string;
    avatar: string;
    parentId: string;
    ageGroup?: '3-5' | '6-8' | '9-10';
    testAvailable?: boolean;
    testId?: string;
}