# Send to Future

A modern **Next.js + Tailwind + Supabase** web application where users can leave notes for themselves or others and have them delivered via email at a scheduled time. Users can login via **Google, Apple, Facebook** or email/password.  

---

## 📝 Features (In progress)

- User authentication with Supabase
  - Email & Password login
  - OAuth: Google, Apple, Facebook
- Create notes with scheduled send time
- Rich text formatting support (bold, italic, colors)
- Future email delivery
- Responsive landing page with InfoCard & LoginCard

---

## 📂 Project Structure

src/
├─ app/
│ ├─ page.tsx # Landing page
│ └─ dashboard/ # After login pages
├─ components/
│ ├─ InfoCard.tsx # Application info component
│ ├─ LoginCard.tsx # Login / register component
│ └─ Editor.tsx # Note form component (future)
├─ lib/
│ └─ supabaseClient.ts
├─ styles/
│ └─ globals.css



---

## ⚡ Getting Started

1. Clone the repo:

git clone https://github.com/emrekrt1655/sendtofuture
cd sendtofuture


2. Install Dependencies:

npm install

3. Create .env.local with your Supabase credentials:

NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

4. Run the development server:

npm run dev


📌 TODOs
Landing Page

 Redesign InfoCard using Tailwind

 Redesign LoginCard using Tailwind

 Add proper mobile & desktop responsiveness

Authentication

 Implement full OAuth login (Google, Apple, Facebook)

 Implement Email/Password login & registration

 Handle errors & loading states

Notes Management

 Show note form component on dashboard after login

 Display list of notes created by the user

 Implement detailed note page with edit functionality

Email Delivery

 Add backend service to send scheduled emails

 Integrate with notes table to trigger email at send_at datetime

Future Enhancements

 Rich text editor with formatting (bold, italic, colors)

 Notifications / reminders

 Multi-language support

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

Emails will be sent via a separate backend service (to be implemented).

⚙️ Contribution

Fork the repository

Create a feature branch (git checkout -b feature/my-feature)

Commit your changes (git commit -am 'Add new feature')

Push to the branch (git push origin feature/my-feature)

Create a Pull Request





