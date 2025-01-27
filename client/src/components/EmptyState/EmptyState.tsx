import React from "react";

export const EmptyState = React.memo(() => (
    <div
        className='flex flex-col items-center justify-center py-12 text-gray-500 selection:text-black'
        role='status'
        aria-label='No results found'
    >
        <img
            src='./search.svg'
            alt='Placeholder search icon'
            draggable={false}
            className='h-16 w-16 mb-4 text-gray-400'
            loading='lazy'
        />
        <p className='text-lg font-medium'>Start searching!</p>
        <p className='text-sm text-gray-400 mt-1'>
            Enter a keyword or phrase to find relevant questions.
        </p>
    </div>
));