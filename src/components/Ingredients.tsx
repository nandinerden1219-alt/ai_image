"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, RotateCw, FileText, MessageCircle } from "lucide-react";
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import { Button } from "./ui/button";

const client = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

export const Ingredients = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleIngredients = (e: any) => {
    setValue(e.target.value);
  };
  const handleReset = () => {
    setResult("");
    setValue("");
  };
  ``;
  const handleGenerate = async () => {
    if (!value) return;
    setIsLoading(true);
    try {
      const interaction = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            text: `Based on this food description: ${value}\n\nReturn in Markdown:\n# Foodname\n## Ingredients\n## Food recipe`,
          },
        ],
      });
      setResult(interaction.text || "");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-4 justify-between">
          <div className="flex gap-4 font-bold">
            <Sparkles /> <h1>Ingredient recognition</h1>
          </div>
          <RotateCw onClick={handleReset} />
        </CardTitle>
        <CardDescription className="mt-5">
          Describe the food, and AI will detect the ingredients.{" "}
        </CardDescription>
        <textarea
          placeholder="Орц тодорхойлох"
          className="h-30 p-2 border rounded-sm"
          onChange={handleIngredients}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleGenerate}
            type="button"
            className="px-6 py-2 rounded-lg font-medium text-white bg-gray-500 flex gap-2"
          >
            {isLoading && <RotateCw className="w-4 h-4 animate-spin" />}
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-black flex flex-col gap-3">
        <div className="flex gap-3 items-center font-bold text-xl">
          <FileText />
          <h1>Identified Ingredients</h1>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <RotateCw className="animate-spin w-5 h-5" />
            <span>Analyzing ingredients...</span>
          </div>
        ) : result ? (
          <Markdown>{result}</Markdown>
        ) : (
          <p className="text-muted-foreground">
            First, upload an image or enter your text, then click Generate.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
