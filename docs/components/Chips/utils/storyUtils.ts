/**
 * For playground purposes only.
 */
import uniq from "lodash/uniq";
import { useState } from "react";

// Async generator for mock data
async function* createMockDataGenerator() {
  const characterSets = [
    ["Luke Skywalker", "Darth Vader", "Leia Organa", "Han Solo", "Chewbacca"],
    ["Obi-Wan Kenobi", "Yoda", "R2-D2", "C-3PO", "Boba Fett"],
    ["Rey", "Finn", "Poe Dameron", "Kylo Ren", "BB-8"],
    ["Ahsoka Tano", "Grogu", "Bo-Katan", "Moff Gideon", "Boba Fett"],
    ["Qui-Gon Jinn", "Padmé Amidala", "Mace Windu", "Count Dooku", "Jabba"],
  ];

  let currentIndex = 0;

  while (currentIndex < characterSets.length) {
    yield {
      options: characterSets[currentIndex],
      next:
        currentIndex < characterSets.length - 1
          ? `page=${currentIndex + 1}`
          : null,
    };
    currentIndex++;
  }
}

const initialOptions = [
  "Mando",
  "Din Djarin",
  "Cara Dune",
  "Rey",
  "Finn",
  "Poe Dameron",
  "Kylo Ren",
  "BB-8",
  "Ahsoka Tano",
  "Grogu",
  "Bo-Katan",
  "Moff Gideon",
  "Boba Fett",
  "Qui-Gon Jinn",
  "Padmé Amidala",
  "Mace Windu",
  "Count Dooku",
  "Jabba",
];

let mockDataGenerator: AsyncGenerator<{
  options: string[];
  next: string | null;
}> | null = null;
const searchCache = new Map<string, string[]>();

export function useFakeOptionQuery() {
  const [options, setOptions] = useState<string[]>(initialOptions);
  const initialDataGetUrl = "page=0";
  const [nextGet, setNextGet] = useState(initialDataGetUrl);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(["Mando", "Din Djarin"]);

  const actions = {
    handleLoadMore: () => {
      if (loading || !nextGet) return;

      setLoading(true);
      fetchData(nextGet).then(result => {
        const newOptions = uniq([...selected, ...options, ...result.options]);
        setOptions(newOptions);
        setNextGet(result.next);
        setLoading(false);
      });
    },
    handleSearch: (searchValue: string) => {
      console.log("fetch data matching search query", searchValue);
      setLoading(true);

      // Use search parameter with our fetchData function
      fetchData(`search=${searchValue}`).then(result => {
        const newOptions = uniq([...selected, ...result.options]);
        setOptions(newOptions);
        setNextGet(result.next);
        setLoading(false);
      });
    },
    handleSelect: (value: string[]) => {
      setSelected(value);
    },
    handleCustomAdd: (value: string) => {
      setSelected(uniq([...selected, value]));
    },
  };

  return { selected, options, loading, ...actions };
}

async function fetchData(url: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return url.includes("search=")
    ? processSearchUrl(url)
    : handlePagination(url);
}

async function processSearchUrl(url: string) {
  const searchTerm = url.split("search=")[1].toLowerCase();

  // Check cache first
  if (searchCache.has(searchTerm)) {
    return {
      options: searchCache.get(searchTerm) || [],
      next: null,
    };
  }

  // Create mock search results
  const allCharacters = [
    "Luke Skywalker",
    "Darth Vader",
    "Leia Organa",
    "Han Solo",
    "Chewbacca",
    "Obi-Wan Kenobi",
    "Yoda",
    "R2-D2",
    "C-3PO",
    "Boba Fett",
    "Rey",
    "Finn",
    "Poe Dameron",
    "Kylo Ren",
    "BB-8",
    "Ahsoka Tano",
    "Grogu",
    "Bo-Katan",
    "Moff Gideon",
    "Qui-Gon Jinn",
    "Padmé Amidala",
    "Mace Windu",
    "Count Dooku",
    "Jabba",
  ];

  const filteredResults = allCharacters.filter(name =>
    name.toLowerCase().includes(searchTerm),
  );

  // Cache results
  searchCache.set(searchTerm, filteredResults);

  return {
    options: filteredResults,
    next: null,
  };
}

async function handlePagination(url: string) {
  if (!mockDataGenerator) {
    mockDataGenerator = createMockDataGenerator();
  }

  // If it's a specific page request
  if (url.includes("page=")) {
    const pageIndex = parseInt(url.split("page=")[1], 10);

    // Reset generator if needed
    if (pageIndex === 0) {
      mockDataGenerator = createMockDataGenerator();
    }
  }

  const result = await mockDataGenerator.next();

  return result.value || { options: [], next: null };
}
