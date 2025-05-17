<div align="center">
  <img src="/public/images/logo/logo.png" alt="Portfolio Logo" width="100" />
  <h1>My Portfolio Website</h1>
  <p>A modern portfolio website built with React, TypeScript, and Supabase</p>

  <p>
    <a href="#demo">View Demo</a>
    ·
    <a href="#installation">Installation</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
  </p>
</div>

<div id="demo">
  <h2>🌟 Demo</h2>
  <p>Visit the live demo: <a href="https://kay2fd-portfolio.vercel.app">My Portfolio</a></p>
</div>

<div id="features">
  <h2>✨ Features</h2>
  <ul>
    <li>📱 Responsive design for all devices</li>
    <li>🌓 Dark/Light mode theme</li>
    <li>🚀 Project showcase with detailed views</li>
    <li>📜 Certificate gallery</li>
    <li>🔒 Admin dashboard</li>
    <li>📸 Image upload functionality</li>
    <li>🔥 Real-time updates with Supabase</li>
    <li>🎨 Smooth animations with Framer Motion</li>
  </ul>
</div>

<div id="tech-stack">
  <h2>🛠️ Tech Stack</h2>
  <ul>
    <li>React + TypeScript</li>
    <li>Vite</li>
    <li>Tailwind CSS</li>
    <li>Supabase</li>
    <li>Framer Motion</li>
    <li>React Router v6</li>
    <li>React Icons</li>
  </ul>
</div>

<div id="installation">
  <h2>📦 Installation</h2>

  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js (v16 or higher)</li>
    <li>npm/yarn</li>
    <li>Supabase account</li>
  </ul>

  <h3>Getting Started</h3>

  <h4>1. Clone the repository</h4>

  ```bash
  git clone https://github.com/Kay2fd/my-portfolio.git
  cd my-portfolio
  ```

  <h4>2. Install dependencies</h4>

  ```bash
  npm install
  # or
  yarn install
  ```

  <h4>3. Configure environment variables</h4>
  <p>Create a <code>.env</code> file in the root directory:</p>

  ```env
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

  <h4>4. Set up Supabase tables</h4>
  <p>Execute these SQL queries in your Supabase SQL editor:</p>

  ```sql
  -- Projects Table
  create table public.projects (
    id uuid not null default extensions.uuid_generate_v4 (),
    title text not null,
    short_description text not null,
    description text not null,
    thumbnail_image_url text not null,
    detail_images jsonb null default '[]'::jsonb,
    tags jsonb null default '[]'::jsonb,
    repo_url text null,
    demo_url text null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    constraint projects_pkey primary key (id)
  );

  -- Certificates Table
  create table public.certificates (
    id uuid not null default extensions.uuid_generate_v4 (),
    title text not null,
    issuer text not null,
    issue_date date not null,
    image_url text not null,
    created_at timestamp with time zone null default now(),
    constraint certificates_pkey primary key (id)
  );

  -- Update Trigger
  create trigger set_projects_updated_at 
  before update on projects 
  for each row execute function 
  update_updated_at_column();
  ```

  <h4>5. Start development server</h4>

  ```bash
  npm run dev
  # or
  yarn dev
  ```

  <h4>6. Build for production</h4>

  ```bash
  npm run build
  # or
  yarn build
  ```
</div>

<div id="author">
  <h2>👤 Author</h2>
  <p>
    <strong>Dika Pangestu</strong><br>
    GitHub: <a href="https://github.com/Kay2fd">@Kay2fd</a><br>
    LinkedIn: <a href="https://www.linkedin.com/in/dika-pangestu">Dika Pangestu</a>
  </p>
</div>

<div align="center">
  <p>⭐ Don't forget to star this repo if you like it!</p>
  <hr>
  <p>Built with ❤️ by Kay2fd</p>
</div>
