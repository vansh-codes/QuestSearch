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

export const validatePaginationParams = (page: any, limit: any) => {
    const validatedPage = Math.max(1, parseInt(page) || 1);
    const validatedLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));
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