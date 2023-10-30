import { useState } from 'react';
import { FacetOption, FacetType } from 'utils/search/search.types';

export const useFacet = (initialFacet?: FacetOption) => {
  const [facet, setFacet] = useState(initialFacet);

  const addFacet = (facet: FacetOption) => {
    setFacet(facet);
  };

  const removeFacet = () => {
    setFacet(undefined);
  };

  const addFacetType = (facetType: FacetType) => {
    if (facet) {
      setFacet({
        ...facet,
        types: [...facet.types, facetType],
      });
    }
  };

  const removeFacetType = (name: string) => {
    if (facet) {
      setFacet({
        ...facet,
        types: facet?.types.filter((item) => item.name !== name),
      });
    }
  };

  return { facet, addFacet, removeFacet, addFacetType, removeFacetType };
};
