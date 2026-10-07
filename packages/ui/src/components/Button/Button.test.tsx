import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Button } from './Button';

describe('Button Component', () => {
	it('renders correctly with default primary variant and md size', () => {
		render(<Button>Deploy Space Marine</Button>);
		const button = screen.getByRole('button', {
			name: /deploy space marine/i,
		});

		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('type', 'button');
		expect(button).toHaveClass('bg-gold-500');
		expect(button).toHaveClass('h-10');
	});

	it('renders all variant styles accurately', () => {
		const { rerender } = render(
			<Button variant="secondary">Secondary</Button>,
		);
		expect(screen.getByRole('button')).toHaveClass('bg-slate-800');

		rerender(<Button variant="outline">Outline</Button>);
		expect(screen.getByRole('button')).toHaveClass('border-gold-500');

		rerender(<Button variant="destructive">Purge</Button>);
		expect(screen.getByRole('button')).toHaveClass('bg-red-600');

		rerender(<Button variant="ghost">Ghost</Button>);
		expect(screen.getByRole('button')).toHaveClass('hover:bg-slate-800');
	});

	it('merges custom className without specificity collisions', () => {
		render(<Button className="custom-test-class shadow-xl">Merged</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('custom-test-class');
		expect(button).toHaveClass('shadow-xl');
		expect(button).toHaveClass('bg-gold-500'); // Base variant preserved
	});

	it('calls onClick handler when clicked by user', async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={handleClick}>Click Me</Button>);
		const button = screen.getByRole('button');

		await user.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('disables interactions and sets disabled attribute when disabled={true}', async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(
			<Button disabled onClick={handleClick}>
				Locked
			</Button>,
		);
		const button = screen.getByRole('button');

		expect(button).toBeDisabled();
		expect(button).toHaveClass('disabled:cursor-not-allowed');

		await user.click(button);
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('handles loading state with accessible aria-busy and spinner', async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(
			<Button isLoading loadingText="Summoning..." onClick={handleClick}>
				Summon
			</Button>,
		);
		const button = screen.getByRole('button');

		expect(button).toHaveAttribute('aria-busy', 'true');
		expect(button).toBeDisabled();
		expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
		expect(screen.getByText('Summoning...')).toBeInTheDocument();

		await user.click(button);
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('forwards ref correctly to the native HTMLButtonElement DOM node', () => {
		const ref = React.createRef<HTMLButtonElement>();
		render(<Button ref={ref}>Ref Target</Button>);

		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
		expect(ref.current?.tagName).toBe('BUTTON');
	});

	describe('Accessibility (WCAG 2.1 AA Audit via axe-core)', () => {
		it('has zero WCAG violations in default primary state', async () => {
			const { container } = render(
				<Button variant="primary">Start Campaign</Button>,
			);
			const results = await axe.run(container);
			expect(results).toHaveNoViolations();
		});

		it('has zero WCAG violations across all variants', async () => {
			const { container } = render(
				<div className="flex gap-4 p-4 bg-slate-950">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="destructive">Exterminates</Button>
					<Button variant="ghost">Inspect</Button>
				</div>,
			);
			const results = await axe.run(container);
			expect(results).toHaveNoViolations();
		});

		it('has zero WCAG violations in loading state', async () => {
			const { container } = render(
				<Button isLoading loadingText="Transmitting orders...">
					Send
				</Button>,
			);
			const results = await axe.run(container);
			expect(results).toHaveNoViolations();
		});
	});
});
