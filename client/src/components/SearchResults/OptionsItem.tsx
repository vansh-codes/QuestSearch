import React from "react"
import { Question } from "../../types/question.types"

const OptionItem = React.memo(({ option }: { option: Question['options'][0] }) => (
    <li
        className={`p-2 rounded ${option.isCorrectAnswer
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-800'
            }`}
    >
        {option.text}
    </li>
))

export default OptionItem