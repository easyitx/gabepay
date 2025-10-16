import { AcquiringMethod, AcquiringProvider } from './acquiring.interface';

export const AcquiringMethods: AcquiringMethod[] = [
  {
    code: 'cashinout_method',
    provider: AcquiringProvider.cashinout,
    relativeProviderCommission: 0,
    relativeCommission: 2,
    isCommissionIncluded: true,
    icon: '/methods/cashinout.svg',
  },
];
