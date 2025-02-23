import mongoose, { Schema, Document } from 'mongoose';
import { QuestionTypes } from '../types/question.types';

export interface IQuestion extends Document, QuestionTypes { }

const QuestionSchema: Schema = new Schema({
    title: { type: String, required: true, index: true, text: true },
    type: { type: String, required: true },
    anagramType: { type: String, required: true },
    blocks: [{
        text: { type: String, required: true },
        showInOption: { type: String, required: true },
        isAnswer: { type: String, required: true }
    }],
    options: [{
        text: { type: String, required: true },
        icCorrectAnswer: { type: Boolean, required: true },
    }],
    siblingId: { type: String, required: true },
    solution: { type: String, required: true },
}, { timestamps: true, autoIndex: true });

// Compound index for sorting and filtering
QuestionSchema.index({
    type: 1,      // first level of filtering
    createdAt: -1 // second level (for sorting, -1 for descending)
});

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
