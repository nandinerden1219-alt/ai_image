"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { ImageAnalysis } from "@/components/ImageAnalysis";
import { Ingredients } from "@/components/Ingredients";
import { ImageCreator } from "@/components/ImageCreator";

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

export default function Home() {
  return (
    <div className="flex flex-col flex-1  bg-[url(/background.gif)] bg-no-repeat bg-center bg-cover font-sans dark:bg-black">
      <main className="font-bold text-lg p-5 border border-b-black">
        Ai tools
      </main>
      <div className="flex justify-center items-center p-10">
        <Tabs defaultValue="overview" className="w-[800px] ">
          <TabsList>
            <TabsTrigger value="analysis" className="p-3">
              Image analysis
            </TabsTrigger>
            <TabsTrigger value="recognition" className="p-3">
              Ingredient recognition
            </TabsTrigger>
            <TabsTrigger value="creator" className="p-3">
              Image creator
            </TabsTrigger>
          </TabsList>
          <TabsContent value="analysis">
            <ImageAnalysis />
          </TabsContent>
          <TabsContent value="recognition">
            <Ingredients />
          </TabsContent>
          <TabsContent value="creator">
            <ImageCreator />
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex justify-end items-end ">
        <MessageCircle className="text-white bg-black w-fit h-fit p-5 border rounded-[50%]" />
      </div>
    </div>
  );
}
