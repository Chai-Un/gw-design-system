import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';

describe('Card Component (Compound Pattern)', () => {
  it('renders all compound subcomponents with correct semantic hierarchy', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Space Marine Squad</CardTitle>
          <CardDescription>Adeptus Astartes Infantry</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Unit composition: 1 Sergeant, 9 Battle-brothers.</p>
        </CardContent>
        <CardFooter>
          <span>Points: 180 pts</span>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Space Marine Squad'
    );
    expect(screen.getByText('Adeptus Astartes Infantry')).toBeInTheDocument();
    expect(
      screen.getByText('Unit composition: 1 Sergeant, 9 Battle-brothers.')
    ).toBeInTheDocument();
    expect(screen.getByText('Points: 180 pts')).toBeInTheDocument();
  });

  it('applies variant styling accurately', () => {
    const { rerender } = render(<Card variant="interactive">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('cursor-pointer');

    rerender(<Card variant="outline">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('bg-transparent');
  });

  it('merges custom className without dropping base classes', () => {
    render(<Card className="custom-card-class p-4">Merged</Card>);
    const card = screen.getByText('Merged');

    expect(card).toHaveClass('custom-card-class');
    expect(card).toHaveClass('p-4');
    expect(card).toHaveClass('rounded-lg');
  });

  it('forwards refs correctly to DOM nodes', () => {
    const cardRef = React.createRef<HTMLDivElement>();
    const titleRef = React.createRef<HTMLHeadingElement>();

    render(
      <Card ref={cardRef}>
        <CardHeader>
          <CardTitle ref={titleRef}>Trophy</CardTitle>
        </CardHeader>
      </Card>
    );

    expect(cardRef.current).toBeInstanceOf(HTMLDivElement);
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
  });

  describe('Accessibility (WCAG 2.1 AA Audit via axe-core)', () => {
    it('has zero WCAG violations when structured properly', async () => {
      const { container } = render(
        <div className="p-4 bg-slate-950">
          <Card variant="interactive">
            <CardHeader>
              <CardTitle>Warhammer 40,000 Starter Set</CardTitle>
              <CardDescription>Everything you need to begin tabletop battles.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contains 44 push-fit Citadel miniatures.</p>
            </CardContent>
            <CardFooter>
              <span>Price: £65.00</span>
            </CardFooter>
          </Card>
        </div>
      );

      const results = await axe.run(container);
      expect(results).toHaveNoViolations();
    });
  });
});
