"use client";

import type { ChatMessage } from "@/types/usecase";

export default function ChatDemo({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="bg-gray-950 rounded-xl overflow-hidden shadow-lg border border-gray-800">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-3 flex items-center gap-3 border-b border-gray-800">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">공</span>
        </div>
        <div>
          <div className="text-white text-sm font-medium">공픈클로 에이전트</div>
          <div className="text-gray-500 text-xs">OpenClaw · 텔레그램</div>
        </div>
        <div className="ml-auto flex gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-green-400 text-xs">온라인</span>
        </div>
      </div>
      
      {/* Messages */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-gray-800 text-gray-200 rounded-bl-md"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="bg-gray-900 px-4 py-3 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-gray-500 text-sm">
            메시지를 입력하세요...
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
