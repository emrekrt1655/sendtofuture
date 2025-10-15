"use Server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNoteEmail({
  to,
  subject,
  content,
}: {
  to: string;
  subject: string;
  content: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Send To Future <onboarding@resend.dev>",
      to,
      subject,
      html: `<div style="font-family:sans-serif">
        <h2>📨 You’ve got a message from the past!</h2>
        <p>${content}</p>
      </div>`,
    });
    if (error) {
        console.log("Resend error: ", error);
        return { success: false, error };
    }
    console.log("Resend data: ", data);
    return { success: true, data };
  } catch (error) {
    console.log("Unexpected error: ", error);
    return { success: false, error };
  }
}
