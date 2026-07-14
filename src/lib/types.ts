/**
 * THE GARDEN DROP — content model.
 *
 * These types are the contract shared by the local JSON store, the Supabase
 * adapter, the admin CRUD screens and the public pages. They mirror
 * supabase/migrations/0001_init.sql one-for-one.
 */

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export type PublishStatus = 'draft' | 'scheduled' | 'published';

/** Every claim on this site is one of these. Nothing else may be printed. */
export type Confidence =
  | 'verified' // traced to a primary source we fetched
  | 'reported' // stated by the introducer, not independently checked
  | 'unverified' // nobody publishes it; we will not guess
  | 'research-required'; // flagged for human research before publication

export type Verdict = 'buy' | 'watch' | 'wait' | 'skip';

export type EvidenceLevel = 'strong' | 'moderate' | 'limited' | 'contested' | 'insufficient';

export type Sun = 'full' | 'part' | 'shade' | 'full-to-part' | 'part-to-shade';
export type Water = 'low' | 'average' | 'high';
export type Availability = 'retail' | 'limited' | 'trade-only' | 'commercial-only' | 'not-yet';

export type PlantType =
  | 'shrub'
  | 'perennial'
  | 'annual'
  | 'rose'
  | 'tree'
  | 'fruit'
  | 'vegetable'
  | 'herb'
  | 'grass'
  | 'vine'
  | 'bulb';

export interface Source {
  id: string;
  title: string;
  publisher?: string;
  url: string;
  /** 'primary' = breeder/university/journal. 'trade' = trade press. 'independent' = trials/extension. */
  kind: 'primary' | 'trade' | 'independent' | 'peer-reviewed';
  accessed?: string; // ISO date
  note?: string;
}

export interface RetailLink {
  id: string;
  label: string;
  url: string;
  vendor: string;
  /** Honest by default: nothing on this site is affiliate unless it says so. */
  affiliate: boolean;
  priceNote?: string; // never invented; only reproduced if published
  plantSlug?: string;
}

// ---------------------------------------------------------------------------
// Editorial scoring
// ---------------------------------------------------------------------------

export type Score = 1 | 2 | 3 | 4 | 5;

export interface ScoreLine {
  score: Score;
  note: string;
}

/** Six axes, 1–5, each with an editorial note. Used on every plant. */
export interface PlantScores {
  novelty: ScoreLine;
  usefulness: ScoreLine;
  climateResilience: ScoreLine;
  easeOfGrowing: ScoreLine;
  availability: ScoreLine;
  valueForMoney: ScoreLine;
}

/** Six axes, 1–5. Note that `hypeRisk` is scored so that HIGH = MORE hype. */
export interface TechniqueScores {
  evidenceStrength: ScoreLine;
  cost: ScoreLine; // 5 = cheap
  difficulty: ScoreLine; // 5 = easy
  likelyBenefit: ScoreLine;
  climateRelevance: ScoreLine;
  hypeRisk: ScoreLine; // 5 = maximum hype. The only inverted axis; labelled as such.
}

export const PLANT_SCORE_LABELS: Record<keyof PlantScores, string> = {
  novelty: 'Novelty',
  usefulness: 'Practical usefulness',
  climateResilience: 'Climate resilience',
  easeOfGrowing: 'Ease of growing',
  availability: 'Availability',
  valueForMoney: 'Value for money',
};

export const TECHNIQUE_SCORE_LABELS: Record<keyof TechniqueScores, string> = {
  evidenceStrength: 'Evidence strength',
  cost: 'Cost (5 = cheap)',
  difficulty: 'Difficulty (5 = easy)',
  likelyBenefit: 'Likely benefit',
  climateRelevance: 'Climate relevance',
  hypeRisk: 'Risk of hype (5 = worst)',
};

// ---------------------------------------------------------------------------
// Entities
// ---------------------------------------------------------------------------

export interface Plant {
  id: string;
  slug: string;
  commonName: string;
  botanicalName: string;
  cultivar?: string;
  tradeName?: string;
  breeder: string;
  breederUrl?: string;
  releaseYear: number;
  /** Which channel the release year refers to. The single biggest trap on this beat. */
  releaseChannel?: 'retail' | 'wholesale' | 'trade' | 'commercial licence';

  type: PlantType;
  imageKey: string; // key into src/content/images.ts

  standfirst: string; // one line, the claim
  description: string;
  whatIsNew: string;

  zones: string;
  zonesConfidence: Confidence;
  heatNote?: string;
  size: string;
  sizeConfidence: Confidence;
  sun: Sun;
  water: Water | 'unverified';

  edible: boolean;
  ornamental: boolean;
  containerSuitable: boolean | 'unverified';
  nativeStatus: 'native' | 'cultivar-of-native' | 'non-native' | 'hybrid';

  availability: Availability;
  availabilityNote?: string;
  whereToBuy: RetailLink[];

  scores: PlantScores;
  verdict: Verdict;
  verdictLine: string; // the sentence that goes in the newsletter
  verdictBody: string;
  /** What we would need to test before we would upgrade the verdict. */
  howWeWouldTestIt?: string;

  sources: Source[];
  affiliateDisclosure?: string;
  issueSlugs: string[]; // plants may appear in multiple issues

  status: PublishStatus;
  updatedAt: string;
}

export interface Technique {
  id: string;
  slug: string;
  name: string;
  imageKey: string;

  standfirst: string;
  whatItIs: string;
  problemItClaimsToSolve: string;

  evidenceLevel: EvidenceLevel;
  evidenceSummary: string;

  costNote: string;
  difficultyNote: string;
  climateFit: string;

  instructions: string[];
  advantages: string[];
  limitations: string[];

  scores: TechniqueScores;
  verdict: Verdict;
  verdictLine: string;
  verdictBody: string;

  sources: Source[];
  issueSlugs: string[];

  status: PublishStatus;
  updatedAt: string;
}

export interface Expert {
  id: string;
  slug: string;
  name: string;
  role: string;
  org: string;
  orgUrl?: string;
  bio: string;
  /** Placeholder portraits are clearly flagged — never implied to be a real person. */
  imageKey?: string;
  imageIsPlaceholder: boolean;
}

export interface Interview {
  expertSlug?: string;
  /** For unsecured interviews we publish the questions, not invented answers. */
  status: 'secured' | 'requested' | 'research-required';
  intro: string;
  exchanges: { q: string; a: string }[];
  /** Questions we intend to ask. Printed openly when the interview is not yet done. */
  questionsToAsk?: string[];
}

/** A single item in "The Drop" — the discovery cards. */
export interface DiscoveryCard {
  title: string;
  kicker: string;
  body: string;
  plantSlug?: string;
  techniqueSlug?: string;
  imageKey?: string;
  verdict?: Verdict;
  verdictLine?: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  standfirst: string;
  kind: 'lead' | 'feature' | 'note';
  imageKey?: string;
  /** Body is markdown-lite: paragraphs separated by blank lines. */
  body: string;
  pullQuote?: string;
  sources: Source[];
  issueSlug: string;
  status: PublishStatus;
}

export type IssueTag =
  | 'plants'
  | 'techniques'
  | 'climate'
  | 'edible'
  | 'ornamental'
  | 'indoor'
  | 'outdoor';

export interface Issue {
  id: string;
  number: number;
  slug: string;
  title: string;
  standfirst: string;
  coverImageKey: string;
  publishDate: string; // ISO
  status: PublishStatus;
  tags: IssueTag[];

  editorsIntro: string;

  leadStorySlug: string;

  /** "The Drop" — five discoveries per issue. */
  discoveries: DiscoveryCard[];

  techniqueLab: {
    techniqueSlug: string;
    framing: string;
    theTest: string;
  };

  worthIt: {
    subject: string;
    subjectHref?: string;
    verdict: Verdict;
    line: string;
    body: string;
  };

  interview: Interview;

  readerAction: {
    heading: string;
    intro: string;
    steps: string[];
    /** Something the reader can send back to us. This is how the publication earns its data. */
    askBack?: string;
  };

  sources: Source[];
  /** Anything in this issue that a human must verify before it goes out. */
  researchRequired: string[];
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Audience-side entities
// ---------------------------------------------------------------------------

export interface Subscriber {
  id: string;
  email: string;
  status: 'pending' | 'confirmed' | 'unsubscribed';
  source: string; // which form
  zone?: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  submitterName: string;
  email: string;
  company?: string;
  subjectName: string; // plant or technique name
  subjectKind: 'plant' | 'technique' | 'other';
  description: string;
  releaseDate?: string;
  links?: string;
  imageUrl?: string;
  retailAvailability?: string;
  status: 'new' | 'reviewing' | 'accepted' | 'declined';
  createdAt: string;
  notes?: string;
}

export interface PartnerEnquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  interest: 'sponsorship' | 'sampling' | 'trials' | 'other';
  message: string;
  createdAt: string;
  status: 'new' | 'replied' | 'closed';
}

export interface Category {
  id: string;
  slug: string;
  label: string;
  kind: 'plant-type' | 'issue-tag' | 'region';
}

export interface Region {
  id: string;
  slug: string;
  label: string;
  zoneRange: string;
  note: string;
}

// ---------------------------------------------------------------------------
// The database shape (local JSON store mirrors this exactly)
// ---------------------------------------------------------------------------

export interface Database {
  issues: Issue[];
  stories: Story[];
  plants: Plant[];
  techniques: Technique[];
  experts: Expert[];
  sources: Source[];
  retailLinks: RetailLink[];
  subscribers: Subscriber[];
  submissions: Submission[];
  partnerEnquiries: PartnerEnquiry[];
  categories: Category[];
  regions: Region[];
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  buy: 'Worth it',
  watch: 'Worth watching',
  wait: 'Wait a year',
  skip: 'Skip it',
};

export const VERDICT_BLURB: Record<Verdict, string> = {
  buy: 'The improvement is real, and you can act on it now.',
  watch: 'Promising, but the claim is not yet tested where it matters.',
  wait: 'Real, but early. Let someone else grow the first generation.',
  skip: 'The evidence does not support the price or the promise.',
};

export const EVIDENCE_LABEL: Record<EvidenceLevel, string> = {
  strong: 'Strong',
  moderate: 'Moderate',
  limited: 'Limited',
  contested: 'Contested',
  insufficient: 'Insufficient',
};
