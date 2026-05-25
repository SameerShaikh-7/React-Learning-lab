# ProShots – Premium Studio & Headshot Booking System

ProShots is a high-end, professionally designed web application tailored for booking premium cinematic headshots, corporate team photography sessions, and natural photo-editing services. Built with a modern, dark-themed visual identity featuring premium gold accents, the application offers an elegant, distraction-free interface combined with robust form control and client-side persistence.

---

## 🚀 Key Features

- **Luxury Visual Identity:** Implements a modern dark mode (`#0a0a0a`) paired with refined typography using **Cormorant Garamond** for editorial displays and **DM Sans** for responsive body copy, tied together with fine gold gradients (`#d4af37`).
- **Dynamic Booking Engine:** Features a state-driven booking manager (`AddBooking`) capturing client data, targeted platform intent (LinkedIn, Resume, Portfolios), choice packages, and custom stylistic inputs.
- **Multi-Select Style Tokens:** Interactive tag selectors allow users to pick multiple processing directions simultaneously, such as *Cinematic*, *Natural*, *Corporate Light*, *Grayscale*, or *Warm Tone*.
- **Authenticity Assurance Toggle:** A custom interactive toggle interface that explicitly updates raw state configuration values (`keepOriginal`), indicating a request to preserve authentic facial details and avoid artificial, over-processed AI filters.
- **Robust Client-Side Validation:** Form inputs are safely cross-checked using regular expression rules covering strict 10-digit mobile structures and formatted electronic mail strings alongside responsive, real-time visual warning logs.
- **Persistent Local Ledger:** Seamlessly synchronizes ongoing registration records directly to the browser's persistent storage engine (`proshots_bookings`) to retain state across full operational reloads.

---

## 📁 Project Structure

```text
├── components/
│   ├── Navbar.tsx         # Sticky navigation with glassmorphism backdrop & responsive layout
│   ├── Slider.tsx         # Automated home carousel utilizing clean opacity state intervals
│   └── Card.tsx           # Reusable interactive tier matrices with conditional accent frames
├── utils/
│   └── type.ts            # Type definitions, model contracts, and mock packages dataset
├── app/
│   ├── addBooking/        
│   │   └── page.tsx       # Controlled client booking layout form with error tracking arrays
│   ├── globals.css        # Core Tailwind directives mapping and system imports
│   └── layout.tsx         # Base document envelope, typography injections, and notifications wrapper
