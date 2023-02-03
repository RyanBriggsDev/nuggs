import Input from "./Input"
import BtnPrimary from '../buttons/BtnPrimary'
import BtnOrange from '../buttons/BtnOrange'
import BtnLight from '../buttons/BtnLight'
import InlineLink from "../InlineLink"
import { useState } from "react"
import Image from "next/image"
import formContentExample from '@/assets/devExamples/formContentExample.png'

const setInitialValues = (formFields: any) => {
    let initialfields = {};
    formFields.forEach((element: any) => {
      initialfields[element.name] = element.initialvalue;
    });
    return initialfields;
  };
  
export default function Form ({
    formContent,
    formClassName,
    formPadding,
    formRounded,
    formWidth,
    btnStyle,
    onSubmit,
}: any) {

    if(!formContent || !onSubmit) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 w-fit gap-5 bg-red-500 text-white p-2 rounded md:justify-center md:items-center">
                <div>
                    <p><strong>Mandatory Props:</strong> formContent and onSubmit.</p>
                    <p><strong>Optional Props:</strong> formPadding, formRounded, formWidth and btnStyle.</p>
                    <p>formContent is an object that contains title, desc?, inputs, button and redirect? props.</p>
                </div>
                <div className='flex items-center justify-center'>
                    <Image src={formContentExample} alt='formContent example code.' />
                </div>
            </div>
        )
    }
    const {title, desc, inputs, button, redirect} = formContent[0]
    const [data, setData] = useState(setInitialValues(inputs))

    const onChangeHandler = (e: any) => setData((p) => ({ ...p, [e.target.name]: e.target.value }))
    const onSubmitHandler = () => onSubmit(data)

    return (
        <form 
            autoComplete={"off"}
            className={`
                ${formClassName ? formClassName : ''} 
                ${formPadding === false ? '' : 'p-7'}
                ${formRounded === false ? '' : 'rounded'}
                ${formWidth ? formWidth : 'w-fit'}
                bg-gray-300 shadow-lg dark:shadow-none dark:bg-dark-gray flex flex-col gap-5
                `
            }
        >
            {title || desc ?
            <div className='flex flex-col gap-1 justify-center items-center'>
                {title ? <h3 className="text-center text-2xl">{title}</h3> : <p className="w-100 bg-red-500 text-white p-2 text-center rounded inline-block">Forms require a title prop</p>}
                {desc ? <p>{desc}</p> : <></>}
            </div>
            :
            <></>
            }
            <div className="flex flex-col gap-3">
            {inputs.map((input: any, index: any ) => (
                <div key={index} className='flex flex-col gap-1'>
                    <label>{input.label}</label>
                    <Input 
                        id={index}
                        name={input.name}
                        type={input.type}
                        defaultValue={input.initialValue}
                        onChange={(e: any)=>onChangeHandler(e)}
                        placeholder={input.initialValue ? null: input.placeholder}
                        maxLength={input.maxLength}
                        minLength={input.minLength}
                        required={input.required}      
                    />
                </div>
            ))}
            </div>
            {button.btnType === 'primary' || !button.btnType 
            ? 
            <BtnPrimary 
            btnText={button.btnText} 
            style={btnStyle}                 
            btnOnClick={(e: any) => {
                    e.preventDefault()
                    onSubmitHandler()
                }}   
            />
            : button.btnType === 'orange' ? 
            <BtnOrange 
                btnText={button.btnText} 
                btnOnClick={(e: any) => {
                    e.preventDefault()
                    onSubmitHandler()
                }}  
            /> 
            : button.btnType === 'light' ? 
            <BtnLight 
                btnText={button.btnText} 
                btnOnClick={(e: any) => {
                    e.preventDefault()
                    onSubmitHandler()
                }} 
            /> 
            : ''
        }
        {redirect 
        ? 
            <InlineLink text={redirect.text} href={redirect.link} />
        :
            <></>
        }
        </form>
    )
}