# Blueprint: AI-Powered Next.js Portfolio

## Overview

This project is a personal portfolio website built with Next.js and styled with Tailwind CSS. It showcases the professional experience, projects, and skills of a data scientist and web developer. The AI agent is tasked with enhancing the site's design, adding new features, and ensuring a high-quality user experience.

## Style and Design

*   **Theme:** Modern, high-tech, dark mode with a "Big Data" and "AI" focus.
*   **Language:** Traditional Chinese (繁體中文).
*   **Primary Colors:** Dark grays and blacks for the background, with vibrant teal, cyan, and neon blue for accents, buttons, and highlights.
*   **Typography:** Clean, sans-serif fonts (e.g., Inter, Poppins).
*   **Animations:** Subtle and professional animations using Framer Motion to enhance user interaction. This includes fade-in-up animations for text, a background-shine effect for cards, and dynamic timeline animations.
*   **Layout:** Responsive design with a focus on clear information hierarchy.

## Implemented Features

*   **Homepage:** A hero section with a typed animation introduction, links to other pages.
*   **About Page:** A timeline-style presentation of work experience, education, and speech experience, with a highlights section, a language skills section, and a professional skills section. The page now features enhanced animations, including a glowing timeline, animated date nodes, and hover effects on cards.
*   **Projects Page:** A card-based layout to display personal and professional projects, styled with animations and effects consistent with the "About" page.
*   **Service Page:** A dedicated page showcasing services offered, with animated cards and descriptions for each service.
*   **Contact Page:** A redesigned contact page with a two-column layout, including direct contact links and a restyled contact form, all matching the site's modern, animated aesthetic.
*   **Navigation:** A responsive and animated navigation bar that includes links to all pages on the site.
*   **Footer:** A standard footer with social media links.
*   **Dynamic Background:** An interactive particle background to create a high-tech feel.
*   **Insight Cards:** Key data-driven achievements are highlighted on the homepage.

## Current Plan: Revamp Homepage (Completed)

**Objective:** To revamp the homepage (`src/app/page.js`) to be more dynamic, visually engaging, and conversion-oriented, focusing on attracting clients.

**Action Steps (Completed):**

1.  **Enhanced Hero Section:**
    *   Modified the main introductory paragraph to be more client-centric.
    *   Updated the primary call-to-action button text to "探索我的專業背景" and added a secondary "立即諮詢" button linking to the contact page.
2.  **Renamed and Maintained "Insights" Section:**
    *   Renamed the `insights` data array to `coreDifferentiators` to better reflect its purpose.
    *   Maintained the existing visual presentation of these core differentiators.
3.  **Added Dedicated "Services" Section:**
    *   Created a new `homepageServices` data array to explicitly list key services (AI product development, career consulting, business insights).
    *   Implemented a new section below the core differentiators, using a card-based layout with icons and descriptions, linking to the full services page.
    *   Added a clear call-to-action button "了解更多服務" to guide users to the `/service` page.
4.  **Overall Layout and Animations:**
    *   Ensured smooth transitions and animations are consistent with the site's design.
5.  **Code Cleanup:**
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.

## Previous Plan: Add Speech Experience Section (Completed)

**Objective:** To add a new section to the "About" page to showcase speech experience with a simple card display.

**Action Steps (Completed):**

1.  **Add "Speech Experience" Section:**
    *   Modified `src/app/about/page.js`.
    *   Added a new "演講經歷" (Speech Experience) section to the page.
2.  **Display Speech Information with Card Layout:**
    *   Created a `speeches` data array containing the speech details.
    *   Implemented a simple card layout to display the speech, reusing existing card styles for consistency.
    *   Adjusted animation delays for subsequent sections to maintain staggered effects.
3.  **Code Cleanup:**
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.

## Previous Plan: Refine Horizontal Timeline Style (Completed)

**Objective:** To ensure the `HorizontalTimeline.js` component's visual style and spacing match `CreativeTimeline.js`.

**Action Steps (Completed):**

1.  **Update Circle Style:**
    *   Modified `src/components/HorizontalTimeline.js`.
    *   Replaced the simple circle with the complex, animated, layered circle design from `CreativeTimeline.js`.
    *   Adjusted the size of the circle to fit the horizontal layout.
    *   Integrated the date text directly into the circle.
2.  **Adjust Spacing and Alignment:**
    *   Modified `src/components/HorizontalTimeline.js`.
    *   Removed excessive padding (`pt-28`) from item containers.
    *   Precisely calculated and applied `marginTop` to position the cards correctly relative to the horizontal line and circles.
3.  **Ensure Color Consistency:**
    *   Modified `src/components/HorizontalTimeline.js`.
    *   Updated all hardcoded `cyan-500` and `cyan-400` colors to use `var(--color-electric-blue)` for consistency with the site's theme.
4.  **Code Cleanup:**
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.

## Previous Plan: Add Service Page (Completed)

**Objective:** To create a new page detailing the services offered.

**Action Steps (Completed):**

1.  **Create Service Page:**
    *   Created a new file at `src/app/service/page.js`.
    *   Designed the page with a title, introduction, and animated cards for each service (Career Consulting, Data Science Consulting, Software Development).
    *   Ensured the design is consistent with the rest of the site.
2.  **Update Navigation Bar:**
    *   Created a new `src/components/Navbar.js` file with a responsive design.
    *   Added a link to the new "/service" page in the navigation bar.
    *   Verified that the new navbar is correctly implemented in the main layout.
3.  **Code Cleanup:**
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.

## Previous Plan: Add Professional Skills Section (Completed)

**Objective:** To add a new section to the "About" page to showcase professional skills.

**Action Steps (Completed):**

1.  **Add "Skills" Section:**
    *   Modified `src/app/about/page.js`.
    *   Added a new "專業技能" (Professional Skills) section to the page.
2.  **Categorize and Display Skills:**
    *   Created a `skills` data array, categorizing skills into "Programming & Databases" and "Machine Learning & AI".
    *   Designed a new UI for the skills section, featuring categories and lists of skills with corresponding icons for a clear and organized presentation.
    *   Applied animations consistent with the page's design.
3.  **Code Cleanup:**
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.

## Previous Plan: Add Language Skills Section (Completed)

**Objective:** To add a new section to the "About" page to showcase language skills.

**Action Steps (Completed):**

1.  **Add "Languages" Section:**
    *   Modified `src/app/about/page.js`.
    *   Added a new "語言能力" (Language Skills) section to the page.
2.  **Create Language Cards:**
    *   Created a new `languages` data array with information about Chinese, English, and German language skills.
    *   Used the same animated card style as the "Highlights" section to display each language, ensuring a consistent design.
    *   Added icons for each language for better visual representation.
3.  **Code Cleanup:**
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.

## Previous Plan: Contact Page Style Update (Completed)

**Objective:** To update the style of the `contact` page to match the aesthetic of the `about` page.

**Action Steps (Completed):**

1.  **Apply `about` page layout:**
    *   Modified `src/app/contact/page.js`.
    *   Replaced the existing layout with the `relative container` and aurora background from `src/app/about/page.js`.
2.  **Update Title and Description:**
    *   Modified `src/app/contact/page.js`.
    *   Styled the title to match the `about` page's title, including the gradient and animation.
    *   Added an introductory paragraph with animation.
3.  **Restyle Contact Form and Layout:**
    *   Modified `src/app/contact/page.js`.
    *   Created a two-column layout.
    *   Added a contact information section with animated icons (Email, LinkedIn, GitHub).
    *   Restyled the contact form, placing it in a styled, animated container.
    *   Updated form inputs and button to match the dark, glowing theme.
    *   Added labels to form elements for better accessibility.
4.  **Code Cleanup:**
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.

## Previous Plan: Project Page Style Update (Completed)

**Objective:** To update the style of the `projects` page to match the aesthetic of the `about` page.

**Action Steps (Completed):**

1.  **Apply `about` page layout:**
    *   Modified `src/app/projects/page.js`.
    *   Replaced the existing layout with the `relative container` and aurora background from `src/app/about/page.js`.
2.  **Update Title and Description:**
    *   Modified `src/app/projects/page.js`.
    *   Styled the title to match the `about` page's title, including the gradient and animation.
    *   Added an introductory paragraph with animation.
3.  **Restyle Project Cards:**
    *   Modified `src/app/projects/page.js`.
    *   Replaced the `Card` component with the inline-styled, animated `motion.div` cards from the `about` page's highlights section.
    *   Added the background shine effect and hover animations.
    *   Made the cards clickable, linking to the `link` property of each project.
4.  **Code Cleanup:**
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.

## Previous Plan: "About Me" Page Aesthetic Overhaul (Completed)

**Objective:** To add more dynamic and visually appealing animations to the About page content.

**Action Steps (Completed):**

1.  **Animate Intro Text:**
    *   Modified `src/app/about/page.js`.
    *   Added a fade-in animation to the introductory paragraph using Framer Motion.
2.  **Stagger Highlight Card Animations:**
    *   Modified `src/app/about/page.js`.
    *   Implemented staggered reveal animations for the highlight cards using Framer Motion's `staggerChildren` or similar techniques for a more dynamic effect.
3.  **Refine Timeline Animations:**
    *   Modified `src/app/about/page.js`.
    *   Reviewed the existing timeline animations in `src/app/about/page.js`.
    *   Added and refined animations for individual timeline event elements (date nodes, cards) for a more engaging scroll experience.
    *   Specifically, added a scale-in and fade-in animation to the date nodes as they enter the viewport.
    *   Refined the existing animation on the timeline cards for a more interesting reveal effect.
    *   Staggered the animation of the date node and the card within each timeline item.
4.  **Code Cleanup:**
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.
5.  **Animate Background Auroras:**
    *   Modified `src/app/globals.css` and `src/app/about/page.js`.
    *   Implemented pulsating and subtle size/opacity change animations for the background gradient circles.
6.  **Animate Highlight Card Icons:**
    *   Modified `src/app/about/page.js`.
    *   Added subtle bounce and rotation animations to the icons within the highlight cards on hover.
7.  **Add Subtle Parallax Effect:**
    *   Modified `src/app/about/page.js`.
    *   Implemented a subtle parallax effect on scroll for selected elements like the background auroras or highlight cards container using `framer-motion`.
    *   Ran `npm run lint -- --fix` to ensure all changes are clean and consistent.