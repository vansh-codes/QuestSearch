export interface QuestionTypes {
    type: string;
    anagramType: string;
    blocks: {
        text: string;
        showInOption: string;
        isAnswer: string;
    }[];
    options: {
        text: string;
        icCorrectAnswer: boolean;
    }[];
    siblingId: string;
    solution: string;
    title: string;
}