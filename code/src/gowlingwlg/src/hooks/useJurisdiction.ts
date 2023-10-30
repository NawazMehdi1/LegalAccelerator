import { useQuery } from '@tanstack/react-query';
import useLanguageHook from 'core/hooks/useLanguageHook';
import { useI18n } from 'next-localization';
import { getJurisdiction } from 'utils/search/jurisdiction';

export const useJurisdiction = () => {
  const { language } = useLanguageHook();
  const { t } = useI18n();

  const { data: jurisdiction } = useQuery({
    queryKey: ['me'],
    queryFn: () => getJurisdiction(language, t),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { jurisdiction };
};
