import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Input } from './Input';

describe('Input Component', () => {
	it('associates label with input using accessible htmlFor linkage', () => {
		render(<Input label="Chapter Name" placeholder="e.g. Ultramarines" />);
		const input = screen.getByLabelText(/chapter name/i);

		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('placeholder', 'e.g. Ultramarines');
		expect(input.id).toBeDefined();
	});

	it('links helperText correctly via aria-describedby', () => {
		render(
			<Input
				label="Army List"
				helperText="Enter army composition code."
			/>,
		);
		const input = screen.getByLabelText(/army list/i);
		const helper = screen.getByText('Enter army composition code.');

		expect(input).toHaveAttribute('aria-describedby', helper.id);
	});

	it('handles error state with aria-invalid, aria-errormessage, and role="alert"', () => {
		render(
			<Input label="Passcode" error="Invalid Inquisitorial cipher." />,
		);
		const input = screen.getByLabelText(/passcode/i);
		const errorText = screen.getByRole('alert');

		expect(input).toBeInvalid();
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAttribute('aria-errormessage', errorText.id);
		expect(input.getAttribute('aria-describedby')).toContain(errorText.id);
		expect(input).toHaveClass('border-red-600');
	});

	it('allows user typing and dispatches change events correctly', async () => {
		const user = userEvent.setup();
		render(<Input label="Commander" />);
		const input = screen.getByLabelText(/commander/i);

		await user.type(input, 'Roboute Guilliman');
		expect(input).toHaveValue('Roboute Guilliman');
	});

	it('renders disabled state properly', () => {
		render(<Input label="Restricted Archive" disabled />);
		const input = screen.getByLabelText(/restricted archive/i);

		expect(input).toBeDisabled();
		expect(input).toHaveClass('cursor-not-allowed');
	});

	it('forwards ref correctly to the HTMLInputElement DOM node', () => {
		const ref = React.createRef<HTMLInputElement>();
		render(<Input ref={ref} label="Ref Target" />);

		expect(ref.current).toBeInstanceOf(HTMLInputElement);
		expect(ref.current?.tagName).toBe('INPUT');
	});

	describe('Accessibility (WCAG 2.1 AA Audit via axe-core)', () => {
		it('has zero WCAG violations with label and helper text', async () => {
			const { container } = render(
				<div className="p-4 bg-slate-950">
					<Input
						label="Warhammer Account Email"
						helperText="We will send confirmation to this email address."
						placeholder="player@warhammer.com"
					/>
				</div>,
			);
			const results = await axe.run(container);
			expect(results).toHaveNoViolations();
		});

		it('has zero WCAG violations in error state', async () => {
			const { container } = render(
				<div className="p-4 bg-slate-950">
					<Input
						label="Warhammer Account Password"
						error="Password must contain at least 8 characters."
						type="password"
					/>
				</div>,
			);
			const results = await axe.run(container);
			expect(results).toHaveNoViolations();
		});
	});
});
