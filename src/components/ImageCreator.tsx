"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Sparkles, RotateCw, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { InferenceClient } from "@huggingface/inference";
const client = new InferenceClient(process.env.NEXT_PUBLIC_HF_TOKEN);
export const ImageCreator = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = () => {
    setValue("");
    setImageUrl("");
  };
  const handleFood = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const generateImage = async () => {
    if (!value) return;
    setIsLoading(true);
    setImageUrl("");
    setError("");
    try {
      const dataUrl = await client.textToImage(
        {
          provider: "fal-ai",
          model: "black-forest-labs/FLUX.1-dev",
          inputs: value,
        },
        { outputType: "dataUrl" },
      );
      setImageUrl(dataUrl);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex gap-4 items-center font-bold">
            <Sparkles />
            <h1>Food Image Creator</h1>
          </div>
          <RotateCw onClick={handleReset} />
        </CardTitle>
        <CardDescription className="mt-5">
          What food image do you want? Describe it briefly.
        </CardDescription>
        <textarea
          value={value}
          onChange={handleFood}
          placeholder="Хийлгэмээр байгаа хоолоо бич."
          className="h-32 p-3 border rounded-md resize-none mt-3"
        />
        <Button
          onClick={generateImage}
          disabled={isLoading}
          className="bg-black text-white mt-5 flex gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Creating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate
            </>
          )}
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-3 items-center font-bold text-xl">
          <FileText />

          <h1>Result</h1>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-2 w-full h-48 rounded-md border text-[#71717A]">
            <Loader2 className="animate-spin w-6 h-6" />
            <span className="text-sm">Generating your image...</span>
          </div>
        ) : imageUrl ? (
          <div className="relative w-fit h-48 rounded-md overflow-hidden border">
            <Image
              src={imageUrl}
              alt="Generated result"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
        ) : error ? (
          <CardDescription className="text-red-500">{error}</CardDescription>
        ) : (
          <CardDescription className="text-[#71717A]">
            First, enter your text to generate an image.
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};
