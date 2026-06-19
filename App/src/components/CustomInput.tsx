import React from 'react'

const CustomInput = ({...props}) => {
  return (
    <div className='max-w-75 sm:max-w-150 py-2'>
      {props?.title && <h1 className='text-neutral-700 text-sm pb-2 font-semibold'>{props?.title?.replace(`${props?.title[0]}`, `${props?.title[0]?.toUpperCase()}`)}</h1>}
      <input name={props?.title?.trim()}
      placeholder={`Enter ${props?.title}`}
      value={props?.value}
      onChange={props?.onChange}
      {...props}
      className={`${props?.value?.length > 0 ? "border-red-800 border" : "border border-neutral-100"} w-full  shadow-sm rounded-md outline-none px-5 py-2`}
      />
    </div>
  )
}

export default CustomInput
