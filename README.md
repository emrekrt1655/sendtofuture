# Send to Future

A modern **Next.js + Tailwind + Supabase + Resend** web application where users can leave notes for themselves or others and have them delivered via email at a scheduled time. Users can login via **Google** or email/password.  

---

## 📝 Features (In progress)

- User authentication with Supabase  (Done)
  - Email & Password login (Done)
  - OAuth: Google, (Done)
- Create notes with scheduled send time (Done)
- Rich text formatting support (bold, italic, colors) (Done)
- Future email delivery (Done)
- Responsive and Theme design
- Multi language support
- Add file support



## ⚡ Getting Started

1. Clone the repo:

git clone https://github.com/emrekrt1655/sendtofuture
cd sendtofuture


2. Install Dependencies:

npm install

3. Create .env.local with your Supabase credentials:

NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
RESEND_API_KEY=<your-resend-api-key>
NEXT_PUBLIC_GUEST_USER_ID=<your-guest-user-id>

4. Run the development server:

npm run dev


💡 Tech Stack

Next.js 15
 (App Router)

Tailwind CSS

Supabase
 for authentication & database

React Icons
 for social login buttons

TypeScript

📬 Notes

Users can leave notes for themselves or for others.

Each note has:

content → text/html

send_at → scheduled send time

recipient_name & recipient_email → optional recipient info

Emails will be sent via a supabase cron job.

⚙️ Contribution

Fork the repository

Create a feature branch (git checkout -b feature/my-feature)

Commit your changes (git commit -am 'Add new feature')

Push to the branch (git push origin feature/my-feature)

Create a Pull Request





