import { useId } from "react";

function Select ({
    options,
    label,
    classname,
    ...props
},ref){
    const id = useId();
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className=""> </label>}
            <select
              {...props}
              id={id}
              ref={ref}
              className={`px-3 py-4 rounded-lg bg-white text-black outlint-none focus:bg-gray-50 duration-200
                            border-gray-200 w-full
                            ${classname}`}>
                                {/* agar value hai tabhi loop karna hai nahi toh crash hojayegi application */}
                        {options?.map((option)=>(
                            <option key={option} value={option} > {option}</option>
                        ))}
              </select>
        </div>
    )
}
export default React.forwardRef(Select)