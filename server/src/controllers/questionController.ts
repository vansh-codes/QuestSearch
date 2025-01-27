import { Request, Response } from 'express';
import { Question } from '../models/Question.models';
import { createSearchQuery, validatePaginationParams, validateSortParams, createSortObject } from '../utils/search.utils';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response.utils';
import { SortOrder } from 'mongoose';

export const searchQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { query = '', page = 1, limit = 10, sort = 'createdAt', order = 'asc', types = [] } = req.query;

        if (!query || typeof query !== 'string') {
            sendErrorResponse(res, 'Search query is required', 400);
            return;
        }

        // Parse types parameter
        const typesList = typeof types === 'string'
            ? types.split(',').filter(Boolean)
            : Array.isArray(types)
                ? types
                : [];


        // validate pagination parameters
        const MAX_LIMIT = 100;
        const MAX_PAGE = 1000;

        const { validatedPage, validatedLimit } = validatePaginationParams(page, limit, MAX_LIMIT, MAX_PAGE);

        // validate sort parameters
        const { sortField: validSortField, sortOrder: validSortOrder } =
            validateSortParams(sort as string, order as string);
            
        // create search query
        const searchQuery = createSearchQuery(query as string, typesList.map(type => type.toString()));

        // create sort object
        const sortObject: { [key: string]: SortOrder } = createSortObject(validSortField, validSortOrder);

        // execute query with lean() for better performance
        const [questions, total] = await Promise.all([
            Question.find(searchQuery)
                .select('title type options blocks anagramType solution')
                .skip((validatedPage - 1) * validatedLimit)
                .limit(validatedLimit)
                .sort(sortObject)
                .setOptions({ allowDiskUse: true, maxTimeMS: 60000 })
                .exec(),
            Question.countDocuments(searchQuery)
        ]);

        const totalPages = Math.ceil(total / validatedLimit);

        // Validate page number against total pages
        if (validatedPage > totalPages && totalPages > 0) {
            sendErrorResponse(res, `Page number exceeds total pages. Maximum page is ${totalPages}`, 400);
            return;
        }

        sendSuccessResponse(res, {
            questions,
            pagination: {
                currentPage: validatedPage,
                totalPages,
                totalItems: total,
                itemsPerPage: validatedLimit
            },
            appliedFilters: {
                types: types || [],
                sort,
                order
            }
        }, 'Search results fetched successfully');

    } catch (error) {
        sendErrorResponse(res, 'Failed to fetch search results', 500, error);
    }
};