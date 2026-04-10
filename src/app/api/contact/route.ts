import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, name, phone, email, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "이름과 이메일은 필수입니다." },
        { status: 400 }
      );
    }

    const submission = {
      company: company || "",
      name,
      phone: phone || "",
      email,
      message: message || "",
      submittedAt: new Date().toISOString(),
    };

    // Save to JSON file (simple file-based storage)
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "submissions.json");
    let submissions = [];

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      submissions = JSON.parse(raw);
    }

    submissions.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

    console.log("New contact submission:", submission);

    return NextResponse.json({ success: true, message: "문의가 접수되었습니다." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
