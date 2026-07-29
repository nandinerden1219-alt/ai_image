"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, RotateCw, FileText, MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import React from "react";
import Markdown from "react-markdown";

const client = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});
const filetoBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const ImageAnalysis = () => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleReset = () => {
    setResult("");
    setPreview("");
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImage(e.target.files?.[0]);
    const imageUrl = URL.createObjectURL(e.target.files?.[0] as Blob);
    setPreview(imageUrl);
  };

  const handleDivClick = async () => {
    fileInputRef.current?.click();
  };
  const handleGenerate = async () => {
    if (!image) return;
    setIsLoading(true);
    try {
      const base64 = await filetoBase64(image);
      const interaction = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            inlineData: {
              mimeType: image.type,
              data: base64,
            },
          },
          {
            text: `What ingredients are in this food? 
            return the result in Markdown:
            #Foodname 
            ##Ingredients
            ##allergy safety`,
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
            <Sparkles /> <h1>Image Analysis</h1>
          </div>
          <RotateCw onClick={handleReset} />
        </CardTitle>
        <CardDescription className="mt-5">
          Upload a food photo, and AI will detect the ingredients.
        </CardDescription>
        <div>
          <div
            className="flex gap-2 border p-2 rounded-lg mt-3 cursor-pointer"
            onClick={handleDivClick}
          >
            <h1 className="font-semibold">Choose File</h1>
            <p className="text-muted-foreground">JPG , PNG</p>
          </div>
          <input
            hidden
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {preview && (
            <div>
              <img
                src={preview}
                alt="Preview"
                style={{ width: "200px", marginTop: "10px" }}
              />
            </div>
          )}
        </div>

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
          <h1>Here is the summary</h1>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <RotateCw className="w-8 h-8 animate-spin text-gray-400" />
            <p className="text-muted-foreground">Analyzing your image...</p>
          </div>
        ) : result ? (
          <Markdown>{result}</Markdown>
        ) : (
          <p className="text-muted-foreground">
            First, enter your image to recognize ingredients.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
