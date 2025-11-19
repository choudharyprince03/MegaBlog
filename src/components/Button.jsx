

const Button = (
    {children,
     type='button',
     bgColor='bg-blue-600', 
     textColor ='white',
     classname='',
     ...props
}) => {
  return (
    <button className={`px-4 py-2 rounded-lg ${type}${bgColor}${textColor}${classname} `}{...props}>
        {children}
    </button>
  )
}

export default Button