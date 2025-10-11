export default function InfoCard() {
  return (
    <div className="space-y-6 max-w-md">
      <h1 className="text-4xl font-bold">Send to Future</h1>
      <p className="text-lg">
        Leave a note for your future self or someone else and have it delivered via email at your chosen time. 
        Format your notes with colors and styles to create memorable reminders.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Quick and easy note creation</li>
        <li>Scheduled delivery to the future</li>
        <li>Secure login with Google or iCloud</li>
      </ul>
    </div>
  )
}
