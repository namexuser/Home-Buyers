
export enum PropertyType {
  House = 'House',
  Flat = 'Flat',
  VacantPlot = 'Vacant Plot',
  Multifamily = 'Multifamily',
  Commercial = 'Commercial'
}

export enum PropertyCondition {
  Excellent = 'Excellent',
  Good = 'Good',
  Fair = 'Fair/Outdated',
  Poor = 'Poor/Needs Major Repairs',
  Plot = 'Vacant/Undeveloped'
}

export interface LeadForm {
  name: string;
  phone: string;
  email: string;
  propertyAddress: string;
  propertyType: PropertyType;
  condition: PropertyCondition;
  situation: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
