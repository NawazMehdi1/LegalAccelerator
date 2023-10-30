const centralEasternEuropeCountries = [
  'AL', // Albania
  'AT', // Austria
  'BA', // Bosnia and Herzegovina
  'BG', // Bulgaria
  'BY', // Belarus
  'CZ', // Czech Republic
  'HR', // Croatia
  'HU', // Hungary
  'ME', // Montenegro
  'MK', // North Macedonia
  'PL', // Poland
  'RO', // Romania
  'RS', // Serbia
  'SI', // Slovenia
  'SK', // Slovakia
];

const australiaNewZealandCountries = [
  'AU', // Australia
  'NZ', // New Zealand
];

const balticStatesCountries = [
  'EE', // Estonia
  'LV', // Latvia
  'LT', // Lithuania
];

const africanCountries = [
  'DZ', // Algeria
  'AO', // Angola
  'BJ', // Benin
  'BW', // Botswana
  'BF', // Burkina Faso
  'BI', // Burundi
  'CM', // Cameroon
  'CV', // Cape Verde
  'CF', // Central African Republic
  'TD', // Chad
  'KM', // Comoros
  'CG', // Congo
  'CD', // Congo, The Democratic Republic of the
  'CI', // Cote d'Ivoire
  'DJ', // Djibouti
  'EG', // Egypt
  'GQ', // Equatorial Guinea
  'ER', // Eritrea
  'ET', // Ethiopia
  'GA', // Gabon
  'GM', // Gambia
  'GH', // Ghana
  'GN', // Guinea
  'GW', // Guinea-Bissau
  'KE', // Kenya
  'LS', // Lesotho
  'LR', // Liberia
  'LY', // Libyan Arab Jamahiriya
  'MG', // Madagascar
  'ML', // Mali
  'MW', // Malawi
  'MR', // Mauritania
  'MU', // Mauritius
  'YT', // Mayotte
  'MA', // Morocco
  'MZ', // Mozambique
  'NA', // Namibia
  'NE', // Niger
  'NG', // Nigeria
  'RE', // Reunion Island
  'RW', // Rwanda
  'ST', // Sao Tome and Principe
  'SN', // Senegal
  'SC', // Seychelles
  'SL', // Sierra Leone
  'SO', // Somalia
  'ZA', // South Africa
  'SS', // South Sudan
  'SD', // Sudan
  'SZ', // Swaziland
  'TZ', // Tanzania, United Republic of
  'TG', // Togo
  'TN', // Tunisia
  'UG', // Uganda
  'EH', // Western Sahara
  'ZM', // Zambia
  'ZW', // Zimbabwe
];

const channelIslandsCountries = [
  'GG', // Guernsey
  'JE', // Jersey
];

const latinAmericaCountries = [
  'AR', // Argentina
  'BO', // Bolivia
  'CL', // Chile
  'CO', // Colombia
  'CR', // Costa Rica
  'DO', // Dominican Republic
  'EC', // Ecuador
  'SV', // El Salvador
  'GT', // Guatemala
  'HN', // Honduras
  'MX', // Mexico
  'NI', // Nicaragua
  'PA', // Panama
  'PY', // Paraguay
  'PE', // Peru
  'PR', // Puerto Rico
  'UY', // Uruguay
  'VE', // Venezuela
];

const middleEastCountries = [
  'BH', // Bahrain
  'EG', // Egypt
  'IR', // Iran
  'IQ', // Iraq
  'JO', // Jordan
  'KW', // Kuwait
  'LB', // Lebanon
  'LY', // Libya
  'OM', // Oman
  'PS', // Palestine
  'QA', // Qatar
  'SA', // Saudi Arabia
  'SY', // Syria
  'TR', // Turkey
  'YE', // Yemen
];

const nordicCountries = [
  'DK', // Denmark
  'FI', // Finland
  'IS', // Iceland
  'NO', // Norway
  'SE', // Sweden
];

const JurisdictionConfig = {
  en: [
    ...africanCountries.map((code) => ({ code, jurisdiction: 'Africa' })),
    ...australiaNewZealandCountries.map((code) => ({
      code,
      jurisdiction: 'Australia & New Zealand',
    })),
    ...balticStatesCountries.map((code) => ({
      code,
      jurisdiction: 'Baltic States',
    })),
    ...centralEasternEuropeCountries.map((code) => ({
      code,
      jurisdiction: 'Central and Eastern Europe',
    })),
    ...channelIslandsCountries.map((code) => ({
      code,
      jurisdiction: 'Channel Islands',
    })),
    ...latinAmericaCountries.map((code) => ({
      code,
      jurisdiction: 'Latin America',
    })),
    ...middleEastCountries.map((code) => ({
      code,
      jurisdiction: 'Middle East',
    })),
    ...nordicCountries.map((code) => ({
      code,
      jurisdiction: 'Nordic Region',
    })),
  ],
};

export async function getJurisdiction(
  locale: string,
  t: <X extends Record<string, unknown> | unknown[]>(
    key: string | (string | number)[],
    params?: X,
    lang?: string
  ) => string
) {
  const response = await fetch('/api/me');
  const geo = await response.json();
  const countryCode = geo?.country;
  const region = JurisdictionConfig[locale as keyof typeof JurisdictionConfig]?.find(
    (item) => item.code === countryCode
  );

  if (region) {
    return region.jurisdiction;
  }

  return t(countryCode) || t('Global');
}
