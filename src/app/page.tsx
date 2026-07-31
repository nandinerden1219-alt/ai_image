"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";
import { ImageAnalysis } from "@/components/ImageAnalysis";
import { Ingredients } from "@/components/Ingredients";
import { ImageCreator } from "@/components/ImageCreator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatSection from "@/components/ChatSection";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[url(/background.gif)] bg-no-repeat bg-center bg-cover font-sans dark:bg-black">
      <main className="font-bold text-lg p-5 border border-b-black">
        Ai tools
      </main>
      <div className="flex justify-center items-center p-10">
        <Tabs defaultValue="overview" className="w-[800px]">
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

      {/* Fixed bottom-right chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className="rounded-full w-14 h-14 shadow-lg"
              />
            }
          >
            <MessageCircle className="w-6 h-6" />
          </PopoverTrigger>
          <PopoverContent className=" w-auto max-w-[400px] overflow-hidden">
            <ChatSection />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
