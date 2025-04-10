"use client";

import React, { useState } from "react";

interface TweetFormat {
  id: number;
  name: string;
  description: string;
  template: string;
  example: string;
}

interface Category {
  id: number;
  name: string;
  formats: number[];
}

// Paystack payment link for donations
const PAYSTACK_DONATE_LINK = "https://paystack.com/pay/8inb8j1um6";

const tweetFormats: TweetFormat[] = [
  {
    id: 1,
    name: "Good vs. Great",
    description: "Compare positive qualities at different levels",
    template: "This starts with [quality] and ends with [advanced quality]",
    example: "Good writing starts with clarity and ends with persuasion."
  },
  {
    id: 2,
    name: "If-Then Statement",
    description: "Conditional statements showing cause and effect",
    template: "If [condition] then [result]. If [opposite condition] then [opposite result].",
    example: "If you read daily, you grow consistently. If you never read, you stay stagnant."
  },
  {
    id: 3,
    name: "People Who",
    description: "Categorize people based on behaviors",
    template: "People who [do this] also [do this embarrassing thing]",
    example: "People who brag about being busy also complain they have no time for important things."
  },
  {
    id: 4,
    name: "Metaphors",
    description: "Use metaphors to explain concepts",
    template: "The best [thing] are actually [metaphor] in disguise.",
    example: "The best teachers are actually students in disguise."
  },
  {
    id: 5,
    name: "Stop, Start",
    description: "Contrast negative vs positive actions",
    template: "Stop [negative action]. Start [positive action].",
    example: "Stop consuming endless content. Start creating value for others."
  },
  {
    id: 6,
    name: "Common Misconception",
    description: "Challenge popular beliefs",
    template: "You're not [common assumption], you're just [actual truth].",
    example: "You're not unmotivated, you're just working on goals you don't care about."
  },
  {
    id: 7,
    name: "Progression Levels",
    description: "Show progression through levels",
    template: "Level 1: [beginner trait]\nLevel 2: [intermediate trait]\nLevel 3: [advanced trait]",
    example: "Level 1: Following the crowd\nLevel 2: Finding your voice\nLevel 3: Creating a movement"
  },
  {
    id: 8,
    name: "Reality Check",
    description: "Challenge perceptions with reality",
    template: "What they see vs. what they don't see",
    example: "What they see: Overnight success\nWhat they don't see: Years of consistent work"
  },
  {
    id: 9,
    name: "Transformation",
    description: "Show change over time",
    template: "I used to [old behavior/belief]. Now I realize [new insight].",
    example: "I used to think more followers meant more success. Now I realize engaged fans beats vanity metrics every time."
  },
  {
    id: 10,
    name: "Dialogue Format",
    description: "Create mini-conversations",
    template: "Person A: [statement]\nPerson B: [response]",
    example: "Beginner: \"I need more followers\"\nExpert: \"You need better content\""
  },
  {
    id: 11,
    name: "Don't/Do",
    description: "Contrast ineffective vs effective approaches",
    template: "Don't do [ineffective action]. Do [effective action].",
    example: "Don't chase followers. Build relationships."
  },
  {
    id: 12,
    name: "The Best X",
    description: "Reframe what excellence means",
    template: "The best [professionals] have unconventional [methods/beliefs].",
    example: "The best creators have unconventional working hours."
  },
  {
    id: 13,
    name: "You're Allowed To",
    description: "Give permission for counter-cultural behavior",
    template: "You're allowed to [uncommon behavior]...",
    example: "You're allowed to change your mind publicly."
  },
  {
    id: 14,
    name: "This Will Do More",
    description: "Contrast effective vs common approach",
    template: "This [uncommon approach] will do more for you than [common approach]",
    example: "Publishing one original idea will do more for you than sharing 100 quotes."
  },
  {
    id: 15,
    name: "When They Say/Mean",
    description: "Reveal hidden meanings",
    template: "When they say [common phrase], they really mean [actual meaning].",
    example: "When they say \"I'm busy\", they really mean \"It's not a priority\"."
  },
  {
    id: 16,
    name: "Virgin vs. Chad",
    description: "Compare beginner vs expert mentality",
    template: "Amateur: [beginner thinking]\nPro: [expert thinking]",
    example: "Amateur: Obsesses over follower count\nPro: Obsesses over helping one person"
  },
  {
    id: 17,
    name: "Therapist Dialogue",
    description: "Revealing conversation format",
    template: "Therapist: [insightful question]\nMe: [defensive answer]\nTherapist: [truth bomb]",
    example: "Therapist: Why do you keep checking your stats?\nMe: To measure growth\nTherapist: No, it's to validate your worth"
  },
  {
    id: 18,
    name: "X can turn anyone",
    description: "Show transformative power",
    template: "[Activity/habit] can turn anyone from [before state] into [after state]",
    example: "Daily writing can turn anyone from a novice into an authority."
  },
  {
    id: 19,
    name: "Prediction",
    description: "Make industry predictions",
    template: "Prediction: [future trend/change] will [outcome]",
    example: "Prediction: AI-assisted content creation will become the norm by 2026."
  },
  {
    id: 20,
    name: "They don't buy X",
    description: "Reveal true customer motivations",
    template: "They don't buy [product], they buy [actual benefit/emotion]",
    example: "They don't buy courses, they buy the future version of themselves."
  }
];

const categories: Category[] = [
  { id: 1, name: "Comparison Formats", formats: [1, 5, 8, 11, 14, 16] },
  { id: 2, name: "Insight Formats", formats: [4, 6, 9, 15, 20] },
  { id: 3, name: "Structure Formats", formats: [2, 7, 12, 18] },
  { id: 4, name: "Dialogue Formats", formats: [3, 10, 17] },
  { id: 5, name: "Statement Formats", formats: [13, 19] }
];

const Page: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCopy = (text: string, id: number): void => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredFormats: TweetFormat[] = searchTerm
    ? tweetFormats.filter((format) =>
        format.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        format.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tweetFormats;

  const getCategoryFormats = (categoryId: number): TweetFormat[] => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return [];
    return category.formats
      .map((formatId) => tweetFormats.find((format) => format.id === formatId))
      .filter((format): format is TweetFormat => Boolean(format));
  };

  const displayedFormats: TweetFormat[] = selectedCategory
    ? getCategoryFormats(selectedCategory)
    : filteredFormats;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Donate Button */}
        <div className="flex justify-center mb-6">
          <a
            href={PAYSTACK_DONATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Donate
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="bg-white p-4 rounded-xl shadow-sm border">
            <input
              type="text"
              placeholder="Search formats..."
              className="w-full mb-4 p-2 border rounded"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />

            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-700"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                    selectedCategory === null ? "bg-blue-100 text-blue-700" : ""
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Formats
                </button>
              </li>
            </ul>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            {displayedFormats.length === 0 ? (
              <div className="text-center text-gray-500">
                No formats found.
              </div>
            ) : (
              displayedFormats.map((format) => (
                <div
                  key={format.id}
                  className="bg-white p-5 rounded-xl shadow-sm border"
                >
                  <h3 className="text-xl font-semibold mb-1">{format.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {format.description}
                  </p>

                  <div className="bg-gray-50 p-4 rounded text-sm whitespace-pre-line mb-3">
                    {format.example}
                  </div>

                  <div className="text-right">
                    <button
                      onClick={() => handleCopy(format.example, format.id)}
                      className="text-sm bg-blue-600 text-white py-1.5 px-3 rounded hover:bg-blue-700 transition"
                    >
                      {copiedId === format.id ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;