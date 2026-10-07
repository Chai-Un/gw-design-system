import * as React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Accessible label associated with the input element via htmlFor.
   */
  label?: string;
  /**
   * Optional helper text explaining input format or requirements.
   */
  helperText?: string;
  /**
   * Error message displayed when validation fails. Automatically triggers aria-invalid.
   */
  error?: string;
  /**
   * Optional wrapper className for container layout.
   */
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id: customId,
      label,
      helperText,
      error,
      className,
      containerClassName,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = customId || `gw-input-${generatedId}`;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    // Construct aria-describedby references
    const describedByParts: string[] = [];
    if (error) describedByParts.push(errorId);
    if (helperText) describedByParts.push(helperId);
    const ariaDescribedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-200 select-none flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
            </span>
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-errormessage={error ? errorId : undefined}
          aria-describedby={ariaDescribedBy}
          className={cn(
            'h-10 w-full rounded-md px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 bg-slate-900 border transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
            error
              ? 'border-red-600 focus-visible:ring-red-500'
              : 'border-slate-700 hover:border-slate-600 focus-visible:border-gold-500 focus-visible:ring-gold-400',
            disabled && 'opacity-50 cursor-not-allowed bg-slate-950 border-slate-800',
            className
          )}
          {...props}
        />

        {error ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-red-500 mt-0.5 animate-fadeIn"
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-400 mt-0.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
