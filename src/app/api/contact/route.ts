import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, name, phone, email, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "이름과 이메일은 필수입니다." },
        { status: 400 }
      );
    }

    // 1. Supabase에 저장
    const { error } = await supabase.from("contact_submissions").insert({
      company: company || null,
      name,
      phone: phone || null,
      email,
      message: message || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "데이터 저장 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // 2. Discord 웹훅 알림
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhook) {
      try {
        await fetch(discordWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "📩 새로운 문의가 접수되었습니다",
                color: 0x161616,
                fields: [
                  { name: "회사명", value: company || "-", inline: true },
                  { name: "이름", value: name, inline: true },
                  { name: "연락처", value: phone || "-", inline: true },
                  { name: "이메일", value: email, inline: false },
                  { name: "문의 내용", value: message || "-", inline: false },
                ],
                timestamp: new Date().toISOString(),
                footer: { text: "HYPHEN 문의 알림" },
              },
            ],
          }),
        });
      } catch (discordErr) {
        console.error("Discord webhook error:", discordErr);
      }
    }

    return NextResponse.json({ success: true, message: "문의가 접수되었습니다." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
