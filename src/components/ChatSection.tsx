import { GoogleGenAI } from "@google/genai";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerViewport,
  MessageScrollerProvider,
} from "@/components/ui/message-scroller";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
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

  const handleUserInput = (e: any) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const currentInput = userInput;
    const newMessage: MessageType = { message: currentInput, role: "USER" };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const ai = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            text: `Based on this food question: ${currentInput} You are a knowledgeable AI food assistant. Answer the user's question accurately, clearly, and concisely. Focus only on what was asked. Avoid unnecessary explanations, repetition, and filler. If the question is ambiguous, ask one brief clarifying question. If you are unsure, state the uncertainty instead of making up information. Format answers with short paragraphs or bullet points when helpful.`,
          },
        ],
      });

      setMessages((prev) => [
        ...prev,
        { role: "AI", message: ai.text ?? "No response." },
      ]);
    } catch (error) {
      console.error("Error", error);
      setMessages((prev) => [
        ...prev,
        { role: "AI", message: "Something went wrong. Please try again." },
      ]);
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
    <div className="flex flex-col w-[350px] h-[450px] overflow-hidden">
      <div className="flex-1 min-h-0 overflow-hidden">
        <MessageScrollerProvider>
          <MessageScroller className="h-full">
            <MessageScrollerViewport className="h-full overflow-y-auto">
              <MessageScrollerContent>
                {messages.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-10">
                    Ask me anything about food!
                  </p>
                )}
                {messages.map((chat, index) => (
                  <Bubble
                    variant={chat.role === "AI" ? "muted" : "default"}
                    align={chat.role === "AI" ? "start" : "end"}
                    key={index}
                  >
                    <BubbleContent className="break-words whitespace-pre-wrap max-w-[280px]">
                      {chat.message}
                    </BubbleContent>
                  </Bubble>
                ))}
                {isLoading && (
                  <Bubble variant="muted" align="start">
                    <BubbleContent>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </BubbleContent>
                  </Bubble>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <div className="flex gap-2 pt-2 shrink-0">
        <input
          onChange={handleUserInput}
          onKeyDown={handleKeyDown}
          type="text"
          className="w-full border rounded-2xl px-3 py-2"
          value={userInput}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <Button variant="outline" onClick={sendMessage} disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default ChatSection;
