export const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Trending", value: "Trending" },
  { label: "Rooms", value: "Rooms" },
  { label: "Iconic cities", value: "Iconic cities" },
  { label: "Mountains", value: "Mountains" },
  { label: "Castles", value: "Castles" },
  { label: "Amazing pools", value: "Amazing pools" },
  { label: "Camping", value: "Camping" },
  { label: "Farms", value: "Farms" },
  { label: "Arctic", value: "Arctic" },
  { label: "Domes", value: "Domes" },
  { label: "Boats", value: "Boats" },
];

export const CATEGORY_NAMES = CATEGORIES.filter((c) => c.label !== "All").map(
  (c) => c.label
);
