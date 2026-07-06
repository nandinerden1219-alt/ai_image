"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, RotateCw, FileText, MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
export default function Home() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="flex flex-col flex-1  bg-zinc-50 font-sans dark:bg-black">
      <main className="font-bold text-lg p-5 border border-b-black">
        Ai tools
      </main>
      <div className="flex justify-center items-center p-10">
        <Tabs defaultValue="overview" className="w-[800px] ">
          <TabsList>
            <TabsTrigger value="analysis">Image analysis</TabsTrigger>
            <TabsTrigger value="recognition">
              Ingredient recognition
            </TabsTrigger>
            <TabsTrigger value="creator">Image creator</TabsTrigger>
          </TabsList>
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-4 justify-between">
                  <div className="flex gap-4 font-bold">
                    <Sparkles /> <h1>Image Analysis</h1>
                  </div>
                  <RotateCw />
                </CardTitle>
                <CardDescription className="mt-5">
                  Upload a food photo, and AI will detect the ingredients.
                </CardDescription>
                <div>
                  <input
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
                    type="button"
                    className="px-6 py-2 rounded-lg font-medium text-white bg-gray-500 "
                  >
                    Generate
                  </button>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-black flex flex-col gap-3">
                <div className="flex gap-3 items-center font-bold text-xl">
                  <FileText />
                  <h1>Here is the summary</h1>
                </div>

                <p className="text-muted-foreground">
                  First, enter your image to recognize an ingredients.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recognition">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-4 justify-between">
                  <div className="flex gap-4 font-bold">
                    <Sparkles /> <h1>Ingredient recognition</h1>
                  </div>
                  <RotateCw />
                </CardTitle>
                <CardDescription className="mt-5">
                  Describe the food, and AI will detect the ingredients.{" "}
                </CardDescription>
                <input type="input" placeholder="Орц оруулах" />
                <button className="bg-black text-white p-2 rounded-md mt-5">
                  Generate
                </button>
              </CardHeader>
              <CardContent className="text-sm text-black flex flex-col gap-3">
                <div className="flex gap-3 items-center font-bold text-xl">
                  <FileText />
                  <h1>Identified Ingredients</h1>
                </div>

                <p className="text-muted-foreground">
                  First, enter your text to recognize an ingredients.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="creator">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-4 justify-between">
                  <div className="flex gap-4 font-bold">
                    <Sparkles /> <h1>Food image creator</h1>
                  </div>
                  <RotateCw />
                </CardTitle>
                <CardDescription className="mt-5">
                  What food image do you want? Describe it briefly.{" "}
                </CardDescription>
                <input type="file" placeholder="Хоолны тайлбар" />
                <button className="bg-black text-white p-2 rounded-md mt-5">
                  Generate
                </button>
              </CardHeader>
              <CardContent className="text-sm text-black flex flex-col gap-3">
                <div className="flex gap-3 items-center font-bold text-xl">
                  <FileText />
                  <h1>Result</h1>
                </div>

                <p className="text-muted-foreground">
                  First, enter your text to generate an image.{" "}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex justify-end items-end ">
        <MessageCircle className="text-white bg-black w-fit h-fit p-5 border rounded-[50%]" />
      </div>
    </div>
  );
}
