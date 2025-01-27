import React from "react"
import { Question } from "../../types/question.types"

const BlockItem = React.memo(({ block }: { block: Question['blocks'][0] }) => (
    <div className='p-3 border rounded shadow-sm bg-gray-50 border-gray-200'>
        <p className='text-gray-800'>{block.text}</p>
    </div>
))

export default BlockItem