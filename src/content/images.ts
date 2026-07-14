/**
 * THE GARDEN DROP — PHOTOGRAPHY MANIFEST
 * ======================================
 *
 * LICENSE
 * -------
 * Every image below is from the FREE tier of Unsplash and is covered by the
 * Unsplash License (https://unsplash.com/license): free to use for commercial
 * and non-commercial purposes, no permission needed, no attribution required
 * (but we credit anyway — see `credit` / `creditUrl`, and images-credits.md).
 * You may NOT sell unaltered copies, nor compile the photos to build a
 * competing image service.
 *
 * NOTE: Unsplash+ / "premium" assets (URLs beginning `plus.unsplash.com/premium_photo-`)
 * are a PAID licence and were deliberately EXCLUDED. Every URL here begins with
 * `https://images.unsplash.com/photo-` and is therefore free-tier.
 *
 * VERIFICATION
 * ------------
 * Every entry was resolved against Unsplash's own photo API (unsplash.com/napi),
 * not guessed. For each image the following were confirmed to exist and match:
 *   - the photo ID / slug
 *   - the canonical CDN base URL (`urls.raw` minus query params)
 *   - the photographer's display name
 *   - the public photo page (`links.html`) used as `creditUrl`
 *   - `premium: false` / `plus: false` (i.e. free licence)
 * `alt` text is derived from Unsplash's own alt_description/description for that
 * photo, so it describes what is actually in the frame.
 *
 * HOTLINKING
 * ----------
 * `url` is the bare CDN base. Append Imgix params at render time, e.g.:
 *   `${img.url}?auto=format&fit=crop&w=1600&q=80`
 *   `${img.url}?auto=format&fit=crop&w=1200&h=1600&q=80`  // portrait crop
 *
 * Last verified: 2026-07-13
 */

export type Img = {
  id: string;
  url: string;
  alt: string;
  credit: string;
  creditUrl: string;
  source: 'unsplash' | 'pexels';
};

export const IMAGES: Record<string, Img> = {
  // ---------------------------------------------------------------------------
  // HERO / MASTHEAD — wide, cinematic, moody
  // ---------------------------------------------------------------------------

  /** Chiaroscuro / Dutch still-life. Confirmed by the photographer as white dahlias. */
  hero_dark_bloom: {
    id: 'photo-1678440114158-6d8c2c6f4385',
    url: 'https://images.unsplash.com/photo-1678440114158-6d8c2c6f4385',
    alt: 'Two large white dahlia flowers against a black background',
    credit: 'Wyxina Tresse',
    creditUrl: 'https://unsplash.com/photos/two-large-white-flowers-on-a-black-background-iCnPK8Of654',
    source: 'unsplash',
  },
  hero_dark_bloom_alt: {
    id: 'photo-1739476488499-c5a67197fb98',
    url: 'https://images.unsplash.com/photo-1739476488499-c5a67197fb98',
    alt: 'A large orange flower on a black background',
    credit: 'Miom _0326',
    creditUrl: 'https://unsplash.com/photos/a-large-orange-flower-on-a-black-background-oCGvbgaj9Lc',
    source: 'unsplash',
  },

  /** Hands + soil, warm light, shallow DOF. */
  hero_hands_soil: {
    id: 'photo-1492496913980-501348b61469',
    url: 'https://images.unsplash.com/photo-1492496913980-501348b61469',
    alt: 'Bokeh photograph of a person carrying a handful of soil',
    credit: 'Gabriel Jimenez',
    creditUrl: 'https://unsplash.com/photos/bokeh-photography-of-person-carrying-soil-jin4W1HqgL4',
    source: 'unsplash',
  },
  hero_hands_seedling: {
    id: 'photo-1542601906990-b4d3fb778b09',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    alt: 'Hands cupping a small plant seedling in dark soil',
    credit: 'Noah Buscher',
    creditUrl: 'https://unsplash.com/photos/hands-holding-small-plant-seedling-in-soil-x8ZStukS2PM',
    source: 'unsplash',
  },

  /** Greenhouse interiors — tall, atmospheric, light streaming. */
  hero_greenhouse: {
    id: 'photo-1546422771-53a0498bc15b',
    url: 'https://images.unsplash.com/photo-1546422771-53a0498bc15b',
    alt: 'Assorted plants inside a light-filled greenhouse',
    credit: 'Johannes Hofmann',
    creditUrl: 'https://unsplash.com/photos/assorted-plants-inside-greenhouse-yaSXZOWymV8',
    source: 'unsplash',
  },
  hero_greenhouse_walkway: {
    id: 'photo-1713305298073-0c5d481bf381',
    url: 'https://images.unsplash.com/photo-1713305298073-0c5d481bf381',
    alt: 'A walkway leading through a greenhouse filled with plants',
    credit: 'Jovan Vasiljević',
    creditUrl: 'https://unsplash.com/photos/a-walkway-leading-to-a-greenhouse-with-lots-of-plants-D9SD5wciKtU',
    source: 'unsplash',
  },

  // ---------------------------------------------------------------------------
  // ISSUE COVERS
  // ---------------------------------------------------------------------------

  /** Issue 01 — "Plants You Haven't Seen Yet" */
  cover_issue_01: {
    id: 'photo-1747476725782-52b3e3c02592',
    url: 'https://images.unsplash.com/photo-1747476725782-52b3e3c02592',
    alt: 'A striking flower blooming against a dark background',
    credit: 'Pawel Andrzejczak',
    creditUrl: 'https://unsplash.com/photos/a-beautiful-flower-blooms-against-a-dark-background-jmfV_jCu9F8',
    source: 'unsplash',
  },
  cover_issue_01_alt: {
    id: 'photo-1758157162209-71dc942f7c33',
    url: 'https://images.unsplash.com/photo-1758157162209-71dc942f7c33',
    alt: 'A delicate pink lotus flower on a black background',
    credit: 'Sebastian Schuster',
    creditUrl: 'https://unsplash.com/photos/a-delicate-pink-lotus-flower-on-a-black-background-01kdXGe5jaQ',
    source: 'unsplash',
  },

  /** Issue 02 — "The Heat-Proof Garden" */
  cover_issue_02: {
    id: 'photo-1777146207419-92345948d04d',
    url: 'https://images.unsplash.com/photo-1777146207419-92345948d04d',
    alt: 'A field of wilting orange and yellow marigolds in hard sunlight',
    credit: 'sourmarb',
    creditUrl: 'https://unsplash.com/photos/field-of-wilting-orange-and-yellow-marigolds-in-sunlight-euMHqPb1eVo',
    source: 'unsplash',
  },
  cover_issue_02_alt: {
    id: 'photo-1549885606-bbc17accf949',
    url: 'https://images.unsplash.com/photo-1549885606-bbc17accf949',
    alt: 'Cracked, sun-baked brown soil',
    credit: 'redcharlie',
    creditUrl: 'https://unsplash.com/photos/cracked-brown-soil-HxxmKwvUbgI',
    source: 'unsplash',
  },

  /** Issue 03 — "Fruit Trees Shrunk" */
  cover_issue_03: {
    id: 'photo-1680413557185-2a3da954bbe8',
    url: 'https://images.unsplash.com/photo-1680413557185-2a3da954bbe8',
    alt: 'A row of lemon trees in pots against a sunlit wall',
    credit: 'Anita Austvika',
    creditUrl: 'https://unsplash.com/photos/a-row-of-lemon-trees-in-pots-on-a-wall-zTuHyNe6fW4',
    source: 'unsplash',
  },
  cover_issue_03_alt: {
    id: 'photo-1756622034653-7f08c15d6e1f',
    url: 'https://images.unsplash.com/photo-1756622034653-7f08c15d6e1f',
    alt: 'Three green figs growing on a tree branch',
    credit: 'John Cameron',
    creditUrl: 'https://unsplash.com/photos/three-green-figs-growing-on-a-tree-branch-vtRSPSfDJ30',
    source: 'unsplash',
  },

  /** Issue 04 — "Soil Tech: What Actually Works?" */
  cover_issue_04: {
    id: 'photo-1545333212-ffebc7933c12',
    url: 'https://images.unsplash.com/photo-1545333212-ffebc7933c12',
    alt: 'A person holding a handful of dark, rich soil',
    credit: 'Seth Cottle',
    creditUrl: 'https://unsplash.com/photos/person-holding-black-soil-lyMZdag-zgQ',
    source: 'unsplash',
  },
  cover_issue_04_alt: {
    id: 'photo-1584747420644-5c767eebcbe6',
    url: 'https://images.unsplash.com/photo-1584747420644-5c767eebcbe6',
    alt: 'A person holding brown soil, shallow depth of field',
    credit: 'THLT LCX',
    creditUrl: 'https://unsplash.com/photos/person-holding-brown-soil-in-tilt-shift-lens-WshjU5cSNU8',
    source: 'unsplash',
  },

  /** Issue 05 — "Native, But Designed" */
  cover_issue_05: {
    id: 'photo-1782896312164-7d484f6defb9',
    url: 'https://images.unsplash.com/photo-1782896312164-7d484f6defb9',
    alt: 'A dense meadow planting of yellow black-eyed Susans',
    credit: 'Annie Spratt',
    creditUrl: 'https://unsplash.com/photos/dense-field-of-yellow-black-eyed-susans-XXFdYainGDU',
    source: 'unsplash',
  },
  cover_issue_05_alt: {
    id: 'photo-1602108910712-42754960c7e4',
    url: 'https://images.unsplash.com/photo-1602108910712-42754960c7e4',
    alt: 'A black and yellow bee on a purple flower',
    credit: 'Sergiy Kalchevskiy',
    creditUrl: 'https://unsplash.com/photos/black-and-yellow-bee-on-purple-flower-wOcdnHhL_Ts',
    source: 'unsplash',
  },

  // ---------------------------------------------------------------------------
  // PLANT PORTRAITS — single-subject botanical
  // ---------------------------------------------------------------------------

  plant_hydrangea: {
    id: 'photo-1621518856558-9b2ce2d0660d',
    url: 'https://images.unsplash.com/photo-1621518856558-9b2ce2d0660d',
    alt: 'Purple and white hydrangeas in bloom',
    credit: 'Tunafish',
    creditUrl: 'https://unsplash.com/photos/purple-and-white-hydrangeas-in-bloom-M-EXwFJVQf4',
    source: 'unsplash',
  },
  plant_rhododendron: {
    id: 'photo-1710664906009-459d672f97cb',
    url: 'https://images.unsplash.com/photo-1710664906009-459d672f97cb',
    alt: 'A cluster of pink rhododendron flowers with green leaves',
    credit: 'Cheung Yin',
    creditUrl: 'https://unsplash.com/photos/a-bunch-of-pink-flowers-with-green-leaves-UQojLYFkhmw',
    source: 'unsplash',
  },
  plant_rose: {
    id: 'photo-1630324182385-6b31a335b171',
    url: 'https://images.unsplash.com/photo-1630324182385-6b31a335b171',
    alt: 'A red rose in bloom, macro photograph',
    credit: 'Anna Tsareva',
    creditUrl: 'https://unsplash.com/photos/red-rose-in-bloom-macro-photo-DXRYrJFa-5w',
    source: 'unsplash',
  },
  plant_coneflower: {
    id: 'photo-1760082925580-65f3bb0dc141',
    url: 'https://images.unsplash.com/photo-1760082925580-65f3bb0dc141',
    alt: 'Yellow coneflower blossoms with dark centres',
    credit: 'MARIOLA GROBELSKA',
    creditUrl: 'https://unsplash.com/photos/yellow-coneflower-blossoms-with-dark-centers-aIiR_aarpWM',
    source: 'unsplash',
  },
  plant_blueberry: {
    id: 'photo-1566400628146-ae8f27849e90',
    url: 'https://images.unsplash.com/photo-1566400628146-ae8f27849e90',
    alt: 'Ripe blueberries on the bush, selective focus',
    credit: 'Élisabeth Joly',
    creditUrl: 'https://unsplash.com/photos/selective-focus-photography-of-blue-berries-d7jhBvnZ9Pc',
    source: 'unsplash',
  },
  plant_fig: {
    id: 'photo-1767416901117-da8b97bf1b2e',
    url: 'https://images.unsplash.com/photo-1767416901117-da8b97bf1b2e',
    alt: 'A ripe fig hanging from a branch with green leaves',
    credit: 'You Le',
    creditUrl: 'https://unsplash.com/photos/a-ripe-fig-hangs-from-a-branch-with-green-leaves-O9yYfckJirY',
    source: 'unsplash',
  },
  plant_peach: {
    id: 'photo-1774329659426-1b83a12f0893',
    url: 'https://images.unsplash.com/photo-1774329659426-1b83a12f0893',
    alt: 'Ripe peaches hanging from a tree branch with green leaves',
    credit: 'Jessica Donnelly',
    creditUrl: 'https://unsplash.com/photos/ripe-peaches-hang-from-a-tree-branch-with-green-leaves-n7ojdn6lsUs',
    source: 'unsplash',
  },
  plant_citrus_pot: {
    id: 'photo-1680413552451-66abaee03107',
    url: 'https://images.unsplash.com/photo-1680413552451-66abaee03107',
    alt: 'A row of potted lemon trees in front of a white wall',
    credit: 'Anita Austvika',
    creditUrl: 'https://unsplash.com/photos/a-row-of-potted-lemon-trees-in-front-of-a-white-wall-40XxfcxV0AI',
    source: 'unsplash',
  },
  plant_dahlia: {
    id: 'photo-1776227469475-4add356ba05d',
    url: 'https://images.unsplash.com/photo-1776227469475-4add356ba05d',
    alt: 'Close-up of a vibrant purple dahlia flower',
    credit: 'Miom _0326',
    creditUrl: 'https://unsplash.com/photos/close-up-of-a-vibrant-purple-dahlia-flower-6HJDahvNpJ4',
    source: 'unsplash',
  },
  plant_salvia: {
    id: 'photo-1773520262592-871b7d924628',
    url: 'https://images.unsplash.com/photo-1773520262592-871b7d924628',
    alt: 'Vibrant red salvia flowers blooming in a garden',
    credit: 'Janusz Walczak',
    creditUrl: 'https://unsplash.com/photos/vibrant-red-salvia-flowers-blooming-in-a-garden-d4h_2BGJyGo',
    source: 'unsplash',
  },
  plant_ornamental_grass: {
    id: 'photo-1783448959992-17cf3d424576',
    url: 'https://images.unsplash.com/photo-1783448959992-17cf3d424576',
    alt: 'Tall, feathery ornamental grass glowing in backlit sunlight',
    credit: 'Danielle-Claude Bélanger',
    creditUrl: 'https://unsplash.com/photos/tall-feathery-ornamental-grass-glowing-in-sunlight-KUGUMBx0MjE',
    source: 'unsplash',
  },
  plant_tomato: {
    id: 'photo-1592841200221-a6898f307baa',
    url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa',
    alt: 'Red and green tomatoes ripening on the vine',
    credit: 'Shalev Cohen',
    creditUrl: 'https://unsplash.com/photos/red-and-green-tomato-fruit-5Oi5sG6G0z8',
    source: 'unsplash',
  },
  plant_lavender: {
    id: 'photo-1595562161314-4ed3f3503826',
    url: 'https://images.unsplash.com/photo-1595562161314-4ed3f3503826',
    alt: 'A field of purple lavender in flower',
    credit: 'Mario Mendez',
    creditUrl: 'https://unsplash.com/photos/purple-flower-field-during-daytime-kkhww8996mg',
    source: 'unsplash',
  },
  /** NOTE: surfaced by Unsplash's "hellebore" search; its own alt text is generic. */
  plant_hellebore: {
    id: 'photo-1677435949011-1bad5d34d172',
    url: 'https://images.unsplash.com/photo-1677435949011-1bad5d34d172',
    alt: 'A close-up cluster of nodding early-spring blooms',
    credit: 'Caroline Ashley',
    creditUrl: 'https://unsplash.com/photos/a-close-up-of-a-bunch-of-flowers-zpJyFZD-3jQ',
    source: 'unsplash',
  },
  plant_coleus: {
    id: 'photo-1746236630785-f880cac0eff0',
    url: 'https://images.unsplash.com/photo-1746236630785-f880cac0eff0',
    alt: 'Colourful coleus plant leaves',
    credit: 'David Clode',
    creditUrl: 'https://unsplash.com/photos/colorful-coleus-plant-leaves-are-vibrant-in-appearance-lHGvq9XF-bE',
    source: 'unsplash',
  },
  /** Stand-in for the ninebark / dark-foliage shrub slot. */
  plant_dark_foliage: {
    id: 'photo-1759667463559-ae6548efb590',
    url: 'https://images.unsplash.com/photo-1759667463559-ae6548efb590',
    alt: 'Vibrant red and purple coleus leaves with yellow edges',
    credit: 'AO NURA',
    creditUrl: 'https://unsplash.com/photos/vibrant-red-and-purple-coleus-leaves-with-yellow-edges-wI7FFDB8NDs',
    source: 'unsplash',
  },
  /** NOTE: surfaced by Unsplash's "clematis" search; its own alt text is generic. */
  plant_clematis: {
    id: 'photo-1622494641758-6ac7fd8facb6',
    url: 'https://images.unsplash.com/photo-1622494641758-6ac7fd8facb6',
    alt: 'A purple climbing-vine flower in macro',
    credit: 'Ed G',
    creditUrl: 'https://unsplash.com/photos/purple-flower-in-macro-shot-RXGQZBnlsbc',
    source: 'unsplash',
  },
  plant_sedum: {
    id: 'photo-1780277857116-a3faf6fe9ede',
    url: 'https://images.unsplash.com/photo-1780277857116-a3faf6fe9ede',
    alt: 'A dense patch of vibrant yellow-green sedum-type succulents',
    credit: 'Hooman Being',
    creditUrl: 'https://unsplash.com/photos/a-dense-patch-of-vibrant-yellow-green-succulent-plants-Uip41F2RP9E',
    source: 'unsplash',
  },
  plant_allium: {
    id: 'photo-1622296052526-433afac0d348',
    url: 'https://images.unsplash.com/photo-1622296052526-433afac0d348',
    alt: 'Purple allium flower heads, shallow depth of field',
    credit: 'Nick Fewings',
    creditUrl: 'https://unsplash.com/photos/purple-flowers-in-tilt-shift-lens-ShV2MGxzK4g',
    source: 'unsplash',
  },

  // ---------------------------------------------------------------------------
  // TECHNIQUE / EDITORIAL
  // ---------------------------------------------------------------------------

  technique_compost_hands: {
    id: 'photo-1642952273588-ed6fa28870ac',
    url: 'https://images.unsplash.com/photo-1642952273588-ed6fa28870ac',
    alt: 'A person holding a handful of dark compost',
    credit: 'Alicia Christin Gerald',
    creditUrl: 'https://unsplash.com/photos/a-person-holding-a-handful-of-dirt-in-their-hand-bQ9y93kdk4c',
    source: 'unsplash',
  },
  technique_compost_hands_alt: {
    id: 'photo-1693414853994-1080baaacb4d',
    url: 'https://images.unsplash.com/photo-1693414853994-1080baaacb4d',
    alt: "A woman's hand reaching into a pile of dark soil",
    credit: 'feey',
    creditUrl: 'https://unsplash.com/photos/a-womans-hand-reaching-into-a-pile-of-dirt-wUqiaRLZDiY',
    source: 'unsplash',
  },
  technique_raised_bed: {
    id: 'photo-1770982698899-14e83be16615',
    url: 'https://images.unsplash.com/photo-1770982698899-14e83be16615',
    alt: 'Raised garden beds planted with vegetables under netting',
    credit: 'Matt Baker',
    creditUrl: 'https://unsplash.com/photos/raised-garden-beds-with-vegetables-under-netting-x25GQ49K_JI',
    source: 'unsplash',
  },
  technique_drip_irrigation: {
    id: 'photo-1748432171507-c1d62fe2e859',
    url: 'https://images.unsplash.com/photo-1748432171507-c1d62fe2e859',
    alt: 'Plants growing in a garden bed with irrigation lines',
    credit: 'Marc Pell',
    creditUrl: 'https://unsplash.com/photos/plants-grow-in-a-garden-bed-with-irrigation-3f7AWW0YWAA',
    source: 'unsplash',
  },
  technique_watering_hose: {
    id: 'photo-1684867430779-e66e779a19b7',
    url: 'https://images.unsplash.com/photo-1684867430779-e66e779a19b7',
    alt: 'A person holding a hose and spraying water',
    credit: 'Giorgio Trovato',
    creditUrl: 'https://unsplash.com/photos/a-person-is-holding-a-hose-and-spraying-water-5G3rZgVLGak',
    source: 'unsplash',
  },
  technique_watering_can: {
    id: 'photo-1747339385292-d58fdff13938',
    url: 'https://images.unsplash.com/photo-1747339385292-d58fdff13938',
    alt: 'Watering plants with a watering can',
    credit: 'Benjamin White',
    creditUrl: 'https://unsplash.com/photos/watering-plants-with-a-watering-can-1VJt-0nyDhg',
    source: 'unsplash',
  },
  technique_mulch_wood_chips: {
    id: 'photo-1635513236283-dedcca2ebd4a',
    url: 'https://images.unsplash.com/photo-1635513236283-dedcca2ebd4a',
    alt: 'A pile of wood chips',
    credit: 'Slava Kompaniets',
    creditUrl: 'https://unsplash.com/photos/a-pile-of-wood-chips-sitting-on-top-of-a-wooden-floor-L2XiRnvJVz0',
    source: 'unsplash',
  },
  technique_shade_cloth: {
    id: 'photo-1751840946036-3cb95a3dab28',
    url: 'https://images.unsplash.com/photo-1751840946036-3cb95a3dab28',
    alt: 'Green shade cloth stretched over a structure under a blue sky',
    credit: 'Andrew Lvov',
    creditUrl: 'https://unsplash.com/photos/green-shading-covers-a-building-under-a-blue-sky-3g7vpj5oDTE',
    source: 'unsplash',
  },
  technique_shade_netting_macro: {
    id: 'photo-1559911462-f7bd56fdf0fb',
    url: 'https://images.unsplash.com/photo-1559911462-f7bd56fdf0fb',
    alt: 'Close-up view of green shade netting',
    credit: 'SUNNY BHOJAWALA',
    creditUrl: 'https://unsplash.com/photos/a-close-up-view-of-a-green-net-annXXam2Jk4',
    source: 'unsplash',
  },
  technique_pruning: {
    id: 'photo-1680124744737-03fb697f303d',
    url: 'https://images.unsplash.com/photo-1680124744737-03fb697f303d',
    alt: 'A person holding secateurs in front of a plant',
    credit: 'Margarita Shtyfura',
    creditUrl: 'https://unsplash.com/photos/a-person-holding-a-pair-of-scissors-in-front-of-a-plant-axZQeOgrZvk',
    source: 'unsplash',
  },
  technique_seed_trays: {
    id: 'photo-1466692476868-aef1dfb1e735',
    url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735',
    alt: 'Rows of seedlings sprouting in propagation trays',
    credit: 'Markus Spiske',
    creditUrl: 'https://unsplash.com/photos/selective-focus-photo-of-plant-spouts-vrbZVyX2k4I',
    source: 'unsplash',
  },
  technique_potting_bench: {
    id: 'photo-1556912743-90a361c19b16',
    url: 'https://images.unsplash.com/photo-1556912743-90a361c19b16',
    alt: 'Work boots beside gloves and handheld garden tools, flat lay',
    credit: 'Sven Brandsma',
    creditUrl: 'https://unsplash.com/photos/pair-of-work-boots-beside-gloves-and-handheld-tools-wVMuNOSt5KY',
    source: 'unsplash',
  },
  technique_soil_lab: {
    id: 'photo-1580982327559-c1202864eb05',
    url: 'https://images.unsplash.com/photo-1580982327559-c1202864eb05',
    alt: 'Two researchers in white coats examining a green plant in a lab',
    credit: 'ThisisEngineering',
    creditUrl: 'https://unsplash.com/photos/2-men-in-white-dress-shirt-holding-green-plant-qb6xk8HaJs8',
    source: 'unsplash',
  },
  technique_plant_microscopy: {
    id: 'photo-1766713203219-8ca06e1f4db9',
    url: 'https://images.unsplash.com/photo-1766713203219-8ca06e1f4db9',
    alt: 'Microscopic view of plant cells with glowing yellow outlines',
    credit: 'Vladlena Malikova',
    creditUrl: 'https://unsplash.com/photos/microscopic-view-of-plant-cells-with-glowing-yellow-outlines-3cutgZyMD4Q',
    source: 'unsplash',
  },

  // ---------------------------------------------------------------------------
  // PEOPLE — PLACEHOLDER PORTRAITS ONLY
  //
  // IMPORTANT: these are anonymous stock subjects. They must NEVER be presented
  // as, captioned as, or implied to be any real named expert or interviewee.
  // Use only as clearly-labelled placeholder imagery.
  // ---------------------------------------------------------------------------

  portrait_01: {
    id: 'photo-1565980100090-3c8b3ec27c43',
    url: 'https://images.unsplash.com/photo-1565980100090-3c8b3ec27c43',
    alt: 'Placeholder portrait: a woman standing between tall plants',
    credit: 'Christin Noelle',
    creditUrl: 'https://unsplash.com/photos/woman-between-plants-636RsYOIHW8',
    source: 'unsplash',
  },
  portrait_02: {
    id: 'photo-1781366636398-51bdc1f75970',
    url: 'https://images.unsplash.com/photo-1781366636398-51bdc1f75970',
    alt: 'Placeholder portrait: a young woman in a straw hat among green plants',
    credit: 'mahdi chaghari',
    creditUrl: 'https://unsplash.com/photos/young-woman-wearing-a-straw-hat-among-green-plants-J3Ijb6gh4oY',
    source: 'unsplash',
  },
  portrait_03: {
    id: 'photo-1644541938904-fa2d5ef35953',
    url: 'https://images.unsplash.com/photo-1644541938904-fa2d5ef35953',
    alt: 'Placeholder portrait: a man picking berries from a bush',
    credit: 'Judah Wester',
    creditUrl: 'https://unsplash.com/photos/a-man-is-picking-berries-off-of-a-bush-2JZvrWDgsKE',
    source: 'unsplash',
  },
  portrait_04: {
    id: 'photo-1780359399081-51bd2b788b02',
    url: 'https://images.unsplash.com/photo-1780359399081-51bd2b788b02',
    alt: 'Placeholder portrait: an older person in a straw hat in a field',
    credit: 'jason hu',
    creditUrl: 'https://unsplash.com/photos/elderly-person-in-straw-hat-talking-on-phone-in-field-kZsxfzL_r5s',
    source: 'unsplash',
  },
  portrait_05: {
    id: 'photo-1728706613022-55c1d7559f21',
    url: 'https://images.unsplash.com/photo-1728706613022-55c1d7559f21',
    alt: 'Placeholder portrait: a woman in a hat and gardening gloves',
    credit: 'Amie Roussel',
    creditUrl: 'https://unsplash.com/photos/a-woman-wearing-a-hat-and-gardening-gloves-jXuw435VPY8',
    source: 'unsplash',
  },
  portrait_06: {
    id: 'photo-1756361984571-740f83432d54',
    url: 'https://images.unsplash.com/photo-1756361984571-740f83432d54',
    alt: 'Placeholder portrait: a grower walking through lush green foliage',
    credit: 'Surya Ahmad Pajar',
    creditUrl: 'https://unsplash.com/photos/farmer-walking-through-lush-green-foliage-E1IXRm1QVhI',
    source: 'unsplash',
  },

  // ---------------------------------------------------------------------------
  // TEXTURE / ABSTRACT
  // ---------------------------------------------------------------------------

  texture_leaf_macro: {
    id: 'photo-1466446230056-1fc585e55d7d',
    url: 'https://images.unsplash.com/photo-1466446230056-1fc585e55d7d',
    alt: 'Macro close-up of a green leaf and its veins',
    credit: 'Stefan Steinbauer',
    creditUrl: 'https://unsplash.com/photos/close-up-photo-of-green-leaf-YyWu19ab4_M',
    source: 'unsplash',
  },
  texture_water_droplets: {
    id: 'photo-1587499211760-9b9b4de880f9',
    url: 'https://images.unsplash.com/photo-1587499211760-9b9b4de880f9',
    alt: 'Water droplets beaded on a green leaf',
    credit: 'Hasan Almasi',
    creditUrl: 'https://unsplash.com/photos/water-droplets-on-green-leaf-G1JWY_OrUmo',
    source: 'unsplash',
  },
  texture_soil: {
    id: 'photo-1575365446892-b5aeab0a59ae',
    url: 'https://images.unsplash.com/photo-1575365446892-b5aeab0a59ae',
    alt: 'Close-up texture of brown soil',
    credit: 'Çağlar Oskay',
    creditUrl: 'https://unsplash.com/photos/brown-soil-srh5xT1pfBI',
    source: 'unsplash',
  },
  texture_seed_pods: {
    id: 'photo-1774962463685-10baa9408e18',
    url: 'https://images.unsplash.com/photo-1774962463685-10baa9408e18',
    alt: 'Tree branches carrying green and dried seed pods',
    credit: 'MChe Lee',
    creditUrl: 'https://unsplash.com/photos/tree-branches-with-green-and-dry-seed-pods-ErqvTgHgkVY',
    source: 'unsplash',
  },
  texture_bark: {
    id: 'photo-1519606247872-0440aae9b827',
    url: 'https://images.unsplash.com/photo-1519606247872-0440aae9b827',
    alt: 'Close-up photograph of brown tree bark',
    credit: 'Jude Infantini',
    creditUrl: 'https://unsplash.com/photos/brown-tree-bark-in-closeup-photography-mI-QcAP95Ok',
    source: 'unsplash',
  },
};

/** Convenience: build a sized, format-optimised CDN URL for hotlinking. */
export function imgUrl(
  img: Img,
  opts: { w?: number; h?: number; q?: number } = {},
): string {
  const { w = 1600, h, q = 80 } = opts;
  const params = [
    'auto=format',
    'fit=crop',
    `w=${w}`,
    h ? `h=${h}` : '',
    `q=${q}`,
  ].filter(Boolean);
  return `${img.url}?${params.join('&')}`;
}
