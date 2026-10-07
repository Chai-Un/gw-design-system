import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors select-none rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-gold-500 text-slate-950 hover:bg-gold-600 active:bg-gold-700 font-semibold shadow-sm',
        secondary:
          'bg-slate-800 text-slate-100 hover:bg-slate-700 active:bg-slate-600 border border-slate-700',
        outline:
          'border border-gold-500 text-gold-500 hover:bg-gold-500/10 active:bg-gold-500/20 bg-transparent',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
        ghost:
          'text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5 min-w-[2rem]',
        md: 'h-10 px-4 text-sm gap-2 min-w-[2.5rem]', // Standard 40px touch target
        lg: 'h-12 px-6 text-base gap-2.5 min-w-[3rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, displays a high-contrast accessible spinner and disables button interaction.
   */
  isLoading?: boolean;
  /**
   * Optional accessible label announced to screen readers when loading.
   */
  loadingText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      loadingText,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading ? 'true' : undefined}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
            data-testid="button-spinner"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {isLoading && loadingText ? (
          <span>{loadingText}</span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
