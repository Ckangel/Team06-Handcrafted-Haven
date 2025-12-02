export interface Artisan {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  location: string;
  joinedYear: number;
}

export const artisans: Artisan[] = [
  { id: 1, name: "Emma Stone", specialty: "Pottery", bio: "Creating organic, earth-inspired ceramics for over 15 years. Each piece reflects my connection to nature.", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370351573_9f8525ce.webp", location: "Portland, OR", joinedYear: 2018 },
  { id: 2, name: "Sofia Martinez", specialty: "Jewelry", bio: "Handcrafting delicate jewelry with ethically sourced gemstones and precious metals.", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370353333_3b51e1a1.webp", location: "Santa Fe, NM", joinedYear: 2019 },
  { id: 3, name: "Maya Chen", specialty: "Textiles", bio: "Weaving stories through natural fibers and traditional techniques passed down through generations.", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370355531_d0465565.webp", location: "Asheville, NC", joinedYear: 2020 },
  { id: 4, name: "James Oak", specialty: "Woodwork", bio: "Transforming sustainably sourced wood into functional art pieces for your home.", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370357269_b6366b19.webp", location: "Seattle, WA", joinedYear: 2017 },
  { id: 5, name: "Luna Rose", specialty: "Candles", bio: "Hand-pouring natural candles with essential oils to create ambiance and tranquility.", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370359041_81f0655b.webp", location: "Austin, TX", joinedYear: 2021 },
  { id: 6, name: "Marcus Tan", specialty: "Leather", bio: "Crafting timeless leather goods using traditional saddle-stitching techniques.", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370360811_ae44754f.webp", location: "Brooklyn, NY", joinedYear: 2019 },
];
