import { describe, expect, it } from 'vitest';

import { denormalizeTaxonomyValue, normalizeTaxonomyValue } from './listing';

describe('listing taxonomy utils', () => {
  it('normalizes whitespace and punctuation for route-safe params', () => {
    expect(normalizeTaxonomyValue('Picnic / Proposal / Date-Night Services')).toBe(
      'picnic-proposal-date-night-services'
    );
  });

  it('denormalizes hyphenated values for headings', () => {
    expect(denormalizeTaxonomyValue('date-night-services')).toBe('Date Night Services');
  });
});
