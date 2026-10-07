import '@testing-library/jest-dom/vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import axe, { type AxeResults } from 'axe-core';

// Mock canvas getContext in jsdom environment for clean axe-core font inspection
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = () => null;
}

afterEach(() => {
  cleanup();
});

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): Promise<T>;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}

expect.extend({
  async toHaveNoViolations(received: HTMLElement | AxeResults) {
    let results: AxeResults;
    if (received && 'violations' in received) {
      results = received as AxeResults;
    } else if (received instanceof HTMLElement) {
      results = await axe.run(received);
    } else {
      throw new Error('toHaveNoViolations expects an HTMLElement or AxeResults object.');
    }

    const pass = results.violations.length === 0;

    return {
      pass,
      message: () => {
        if (pass) {
          return 'Expected accessibility violations, but found none.';
        }
        const errorList = results.violations
          .map(
            (v, idx) =>
              `  ${idx + 1}. [${v.id}] ${v.help} (Impact: ${v.impact})\n     Help URL: ${v.helpUrl}\n     Nodes: ${v.nodes
                .map((n) => n.html)
                .join(', ')}`
          )
          .join('\n\n');
        return `Expected 0 WCAG accessibility violations, but found ${results.violations.length}:\n\n${errorList}`;
      },
    };
  },
});
