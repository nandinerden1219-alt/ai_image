import { Card } from "./ui/card";
import { GoogleGenAI } from "@google/genai";
import { Message } from "@/components/ui/message";
import { PopoverContent } from "./ui/popover";
import {
  ArrowUpIcon,
  GlobeIcon,
  ImageIcon,
  MessageCircleDashedIcon,
  PaperclipIcon,
  PlusIcon,
  RotateCwIcon,
  TelescopeIcon,
} from "lucide-react";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Button } from "./ui/button";
import { useState } from "react";
const client = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});
type MessageType = {
  message: string;
  role: "USER" | "AI";
};
const ChatSection = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleUserInput = (e: any) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage: MessageType = { message: userInput, role: "USER" };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const ai = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            text: `Based on this food question: ${userInput} You are a knowledgeable AI food assistant. Answer the user's question accurately, clearly, and concisely. Focus only on what was asked. Avoid unnecessary explanations, repetition, and filler. If the question is ambiguous, ask one brief clarifying question. If you are unsure, state the uncertainty instead of making up information. Format answers with short paragraphs or bullet points when helpful.`,
          },
        ],
      });

      setMessages((prev) => [
        ...prev,
        { role: "AI", message: ai.text ?? "No response." },
      ]);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <PopoverContent className="w-full h-100">
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent>
              {messages.map((chat, index) => (
                <Bubble
                  variant={chat.role === "AI" ? "muted" : "default"}
                  align={chat.role === "AI" ? "start" : "end"}
                  key={index}
                >
                  <BubbleContent>{chat.message}</BubbleContent>
                </Bubble>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <div className="flex gap-2">
        <input
          onChange={handleUserInput}
          onKeyDown={handleKeyDown}
          type="text"
          className="w-full border rounded-2xl"
          value={userInput}
        />
        <Button variant="outline" onClick={sendMessage}>
          send
        </Button>
      </div>
    </PopoverContent>
  );
};
export default ChatSection;
