import React from "react";
import { FiAlertCircle } from "react-icons/fi";

export const Error = React.memo(({ error, onRetry }: { error: string; onRetry: () => void }) => (
    <>
        <div
            className='max-w-md mx-auto bg-red-50 p-4 rounded-lg flex items-center justify-between'
            role='alert'
        >
            <div className='flex items-center space-x-3'>
                <FiAlertCircle className='text-red-500 w-5 h-5' />
                <span className='text-red-700'>{error}</span>
            </div>
            <button
                onClick={onRetry}
                className='px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200'
                aria-label='Retry search'
            >
                Retry
            </button>
        </div>
        <div className='flex justify-center items-center py-12' aria-label='Search Failed'>
            <img src='./fail.svg' alt='Search Failed' className='h-48 w-48' draggable={false} />
        </div>
    </>
));