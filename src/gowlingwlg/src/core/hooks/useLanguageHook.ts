import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const useLanguageHook = () => {
  const { sitecoreContext } = useSitecoreContext();

  const tokenizedLanguageDetails = sitecoreContext?.language?.split('-');
  const language = tokenizedLanguageDetails?.[0]?.toLocaleLowerCase() ?? 'en';
  const country = tokenizedLanguageDetails?.[1]?.toLocaleUpperCase() ?? 'gb';

  return { language, country };
};

export default useLanguageHook;
