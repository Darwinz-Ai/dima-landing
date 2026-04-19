import { CircleFlag } from 'react-circle-flags';

import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const NumericCircleFlag = ({ numericCode }: { numericCode: string; }) => {
    const alpha2 = countries.numericToAlpha2(numericCode);

    if (!alpha2) {
        console.warn(`No flag found for numeric code: ${numericCode}`);
        return null;
    }

    return <CircleFlag countryCode={alpha2.toLowerCase()} className='w-4 h-4' />;
};

export default NumericCircleFlag;