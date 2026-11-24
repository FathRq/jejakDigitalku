import { forwardRef, type InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

/** Text input styled from the design tokens (see the `.input` class in index.css). */
const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, style, ...rest }: Props,
  ref,
) {
  return (
    <input
      ref={ref}
      className={`input${className ? ` ${className}` : ''}`}
      style={style}
      {...rest}
    />
  )
})

export default Input
