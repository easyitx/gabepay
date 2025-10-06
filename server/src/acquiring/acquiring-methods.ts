import { AcquiringMethod, AcquiringProvider } from './acquiring.interface';

export const AcquiringMethods: AcquiringMethod[] = [
  {
    code: 'cashinout_method',
    provider: AcquiringProvider.cashinout,
    relativeProviderCommission: 2,
    relativeCommission: 0,
    isCommissionIncluded: true,
    icon: '/methods/cashinout.svg',
  },
];
