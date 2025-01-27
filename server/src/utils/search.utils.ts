import { SortOrder } from 'mongoose';

// define valid sort fields as a constant
const VALID_SORT_FIELDS = ['title', 'type', 'createdAt', 'anagramType'] as const;
type ValidSortField = typeof VALID_SORT_FIELDS[number];

interface SortOptions {
    sortField: ValidSortField;
    sortOrder: 'asc' | 'desc';
}

export const createSearchQuery = (
    searchTerm: string,
    types: string[]
) => {
    const query: any = {};

    // add title search if searchTerm exists
    if (searchTerm?.trim()) {
        // escape special characters to prevent regex injection
        const sanitizedTerm = searchTerm
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .trim();

        query.title = {
            $regex: sanitizedTerm,
            $options: 'i'  // case-insensitive search
        };
    }

    // add type filtering if types are provided
    if (Array.isArray(types) && types.length > 0) {
        query.type = { $in: types };
    }

    return query;
};

export const validatePaginationParams = (page: any, limit: any, maxLimit: number = 100, maxPage: number = 1000) => {
    let validatedPage = parseInt(page as string, 10);
    let validatedLimit = parseInt(limit as string, 10);

    // Validate limit
    if (isNaN(validatedLimit) || validatedLimit < 1) {
        validatedLimit = 10;
    }
    validatedLimit = Math.min(validatedLimit, maxLimit);

    // Validate page
    if (isNaN(validatedPage) || validatedPage < 1) {
        validatedPage = 1;
    }
    validatedPage = Math.min(validatedPage, maxPage);

    return { validatedPage, validatedLimit };
};

export const validateSortParams = (
    sortField: string = 'createdAt',
    sortOrder: string = 'asc'
): SortOptions => {
    const validatedField = VALID_SORT_FIELDS.includes(sortField as ValidSortField)
        ? sortField as ValidSortField
        : 'createdAt';

    const validatedOrder = sortOrder === 'asc' ? 'asc' : 'desc';

    return {
        sortField: validatedField,
        sortOrder: validatedOrder
    };
};

export const createSortObject = (
    sortField: ValidSortField,
    sortOrder: 'asc' | 'desc'
): Record<ValidSortField, SortOrder> => {
    const sortObject: Record<ValidSortField, SortOrder> = {
        title: 'asc',
        type: 'asc',
        createdAt: 'asc',
        anagramType: 'asc'
    };
    sortObject[sortField] = sortOrder === 'asc' ? 'asc' : 'desc';
    return sortObject;
};