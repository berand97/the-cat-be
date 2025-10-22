import { BaseEntity } from './base.entity';

export interface Weight {
  imperial: string;
  metric: string;
}

export interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
}

export class Breed extends BaseEntity {
  breedId: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  countryCodes: string;
  countryCode: string;
  lifeSpan: string;
  indoor: number;
  lap: number;
  altNames?: string;
  adaptability: number;
  affectionLevel: number;
  childFriendly: number;
  dogFriendly: number;
  energyLevel: number;
  grooming: number;
  healthIssues: number;
  intelligence: number;
  sheddingLevel: number;
  socialNeeds: number;
  strangerFriendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressedTail: number;
  shortLegs: number;
  wikipediaUrl?: string;
  hypoallergenic: number;
  referenceImageId?: string;
  image?: Image;
  weight: Weight;

  constructor(data?: Partial<Breed>) {
    super(data);
    this.breedId = data?.breedId || '';
    this.name = data?.name || '';
    this.description = data?.description || '';
    this.temperament = data?.temperament || '';
    this.origin = data?.origin || '';
    this.countryCodes = data?.countryCodes || '';
    this.countryCode = data?.countryCode || '';
    this.lifeSpan = data?.lifeSpan || '';
    this.indoor = data?.indoor || 0;
    this.lap = data?.lap || 0;
    this.altNames = data?.altNames;
    this.adaptability = data?.adaptability || 0;
    this.affectionLevel = data?.affectionLevel || 0;
    this.childFriendly = data?.childFriendly || 0;
    this.dogFriendly = data?.dogFriendly || 0;
    this.energyLevel = data?.energyLevel || 0;
    this.grooming = data?.grooming || 0;
    this.healthIssues = data?.healthIssues || 0;
    this.intelligence = data?.intelligence || 0;
    this.sheddingLevel = data?.sheddingLevel || 0;
    this.socialNeeds = data?.socialNeeds || 0;
    this.strangerFriendly = data?.strangerFriendly || 0;
    this.vocalisation = data?.vocalisation || 0;
    this.experimental = data?.experimental || 0;
    this.hairless = data?.hairless || 0;
    this.natural = data?.natural || 0;
    this.rare = data?.rare || 0;
    this.rex = data?.rex || 0;
    this.suppressedTail = data?.suppressedTail || 0;
    this.shortLegs = data?.shortLegs || 0;
    this.wikipediaUrl = data?.wikipediaUrl;
    this.hypoallergenic = data?.hypoallergenic || 0;
    this.referenceImageId = data?.referenceImageId;
    this.image = data?.image;
    this.weight = data?.weight || { imperial: '', metric: '' };
  }
}