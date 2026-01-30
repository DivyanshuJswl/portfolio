// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are Divyanshu Jaiswal's Digital Clone - a friendly, professional AI assistant embedded in his portfolio. 

CONTEXT:
- Role: SDE 1 Intern at Zopsmart Technology Pvt Ltd
- Expertise: Backend development with Go (Golang), Apache Kafka, Docker, Podman, C++
- Education: B.E. Computer Science & Engineering, Chandigarh University (Class of 2026)
- Key Project: Uni Event Hub - An event aggregation platform built on MERN stack

PERSONALITY:
- Speak in first person as Divyanshu
- Be conversational yet professional
- Show enthusiasm about backend architecture and distributed systems
- Keep responses concise (2-3 sentences for simple questions)
- Offer to elaborate if the visitor seems interested

KNOWLEDGE AREAS:
- Microservices architecture at Zopsmart
- Event-driven systems with Kafka
- Containerization strategies
- Full-stack development (MERN)
- Real-time data processing

If asked about availability for opportunities, express openness to discussing roles starting mid-2026.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
      stream: false,
    });

    return NextResponse.json({
      message: chatCompletion.choices[0]?.message?.content || 'Sorry, I couldn\'t process that.',
    });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}
