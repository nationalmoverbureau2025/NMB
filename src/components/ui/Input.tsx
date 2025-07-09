import { ChangeEventHandler } from 'react'

export const Input = ({
  name,
  label,
  value,
  onChange,
}: {
  name: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type="text"
      id={name}
      required
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
)
