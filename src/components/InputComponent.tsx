type Props = {
  labelHtmlFor: string
  labelText: string
  inputId: string
  inputName: string
  inputType: string
  inputPlaceholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputComponent({ props }: { props: Props }) {
  return (
    <div>
      <label
        htmlFor={props.labelHtmlFor}
        className="block text-sm font-medium leading-6 text-white"
      >
        {props.labelText}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          value={props.value}
          onChange={props.onChange}
          id={props.inputId}
          name={props.inputName}
          type={props.inputType}
          placeholder={props.inputPlaceholder}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  )
}
