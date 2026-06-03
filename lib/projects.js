import Image from "next/image";

import purai_splash from "@/public/images/projects/purai/purai-splash.png";
import purai_docs_1 from "@/public/images/projects/purai/purai-docs-1.png";
import purai_docs_2 from "@/public/images/projects/purai/purai-docs-2.png";
import purai_docs_3 from "@/public/images/projects/purai/purai-docs-3.png";
import purai_showcase_1 from "@/public/images/projects/purai/purai-showcase-1.png";
import purai_showcase_2 from "@/public/images/projects/purai/purai-showcase-2.png";
import purai_pricing from "@/public/images/projects/purai/purai-pricing.png";

import lhscsa_splash from "@/public/images/projects/lhscsa/lhscsa-splash-light.png";
import lhscsa_bento from "@/public/images/projects/lhscsa/lhscsa-bento-light.png";
import lhscsa_about from "@/public/images/projects/lhscsa/lhscsa-about-light.png";

import cobalt_ext from "@/public/images/projects/cobalt-ext/cobalt-ext-splash.png";

import lightshows_teaser from "@/public/images/projects/lightshows/snapshots/2-pulpo-rainbow.jpg";

import amelie_confetti from "@/public/images/projects/2025-amelie-projections/amelie-confetti.jpg";
import amelie_dufayel from "@/public/images/projects/2025-amelie-projections/a-dufayel.jpg";
import amelie_apartment from "@/public/images/projects/2025-amelie-projections/apartment.jpg";
import amelie_booth_went_bright from "@/public/images/projects/2025-amelie-projections/booth-went-bright.png";
import amelie_elton_john from "@/public/images/projects/2025-amelie-projections/elton-john.png";
import amelie_final_photo from "@/public/images/projects/2025-amelie-projections/final-photo.png";
import amelie_final_works from "@/public/images/projects/2025-amelie-projections/final-works.jpg";
import amelie_fish_dead from "@/public/images/projects/2025-amelie-projections/fish-dead.jpg";
import amelie_flyers from "@/public/images/projects/2025-amelie-projections/flyers.jpg";
import amelie_flyers_2 from "@/public/images/projects/2025-amelie-projections/flyers-2.png";
import amelie_girl_with_the_glass from "@/public/images/projects/2025-amelie-projections/girl-with-the-glass.png";
import amelie_halfway from "@/public/images/projects/2025-amelie-projections/halfway.png";
import amelie_hipolito from "@/public/images/projects/2025-amelie-projections/hipolito.png";
import amelie_map_gnome from "@/public/images/projects/2025-amelie-projections/map-gnome.jpg";
import amelie_memorial_vid from "@/public/images/projects/2025-amelie-projections/memorial-vid.jpg";
import amelie_metro_station from "@/public/images/projects/2025-amelie-projections/metro-station.png";
import amelie_notre_dame from "@/public/images/projects/2025-amelie-projections/notre-dame.png";
import amelie_two_windmills from "@/public/images/projects/2025-amelie-projections/two-windmills.png";

import resolved_hero from "@/public/images/projects/resolved/hero.png";
import resolved_product from "@/public/images/projects/resolved/product.png";
import resolved_reviews from "@/public/images/projects/resolved/reviews.png";
import resolved_suggested_products from "@/public/images/projects/resolved/suggested-products.png";

import prep_map from "@/public/images/projects/prep/prep-map.png";
import prep_checklist from "@/public/images/projects/prep/prep-checklist-light.png";
import prep_emergency_dialog from "@/public/images/projects/prep/prep-emergency-dialog-light.png";
import prep_full_map from "@/public/images/projects/prep/prep-full-map-light.png";
import prep_main_page from "@/public/images/projects/prep/prep-main-page-light.png";

import { PhotoGallery } from "@/components/ui/photo-gallery";
import { ProductImage } from "@/components/ui/product-image";
import { QLabLogo } from "@/components/ui/icons";
import { Link } from "@/components/ui/link";

export const technologyInformation = {
  nextjs: {
    name: "Next.js",
    icon: (
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_408_139"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={180}
          height={180}
        >
          <circle cx={90} cy={90} r={90} fill="black" />
        </mask>
        <g mask="url(#mask0_408_139)">
          <circle
            cx={90}
            cy={90}
            r={87}
            fill="black"
            stroke="white"
            strokeWidth={6}
          />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
            fill="url(#paint0_linear_408_139)"
          />
          <rect
            x={115}
            y={54}
            width={12}
            height={72}
            fill="url(#paint1_linear_408_139)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_408_139"
            x1={109}
            y1={116.5}
            x2={144.5}
            y2={160.5}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset={1} stopColor="white" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="paint1_linear_408_139"
            x1={121}
            y1={54}
            x2={120.799}
            y2={106.875}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset={1} stopColor="white" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  tailwindcss: {
    name: "TailwindCSS",
    icon: (
      <svg
        viewBox="0 0 256 154"
        width="1.5em"
        height="1.5em"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <defs>
          <linearGradient
            x1="-2.778%"
            y1="32%"
            x2="100%"
            y2="67.556%"
            id="gradient"
          >
            <stop stopColor="#2298BD" offset="0%" />
            <stop stopColor="#0ED7B5" offset="100%" />
          </linearGradient>
        </defs>
        <path
          d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z"
          fill="url(#gradient)"
        />
      </svg>
    ),
  },
  react: {
    name: "React",
    icon: (
      <svg
        viewBox="0 0 256 228"
        width="1.5em"
        height="1.5em"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345.522 2.107.986 4.173 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86-22.86-10.235-22.86-22.86 10.235-22.86 22.86-22.86Z"
          fill="#00D8FF"
        />
      </svg>
    ),
  },
  js: {
    name: "JavaScript",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1052 1052"
        width="1.5em"
        height="1.5em"
      >
        <path fill="#f0db4f" d="M0 0h1052v1052H0z" />
        <path
          d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z"
          fill="#323330"
        />
      </svg>
    ),
  },
  html: {
    name: "HTML",
    icon: (
      <svg
        width="1.5em"
        height="1.5em"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 452 520"
      >
        <path fill="#e34f26" d="M41 460L0 0h451l-41 460-185 52" />
        <path fill="#ef652a" d="M226 472l149-41 35-394H226" />
        <path
          fill="#ecedee"
          d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z"
        />
        <path
          fill="#fff"
          d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z"
        />
      </svg>
    ),
  },
  capture: {
    name: "Capture Visualization",
    icon: (
      <img
        src="/images/projects/lightshows/capture.jpg"
        className="w-[1.5em] rounded-full"
        alt=""
      />
    ),
  },
  etceos: {
    name: "ETC EOS",
    icon: (
      <img
        src="/images/projects/lightshows/etc.png"
        className="w-[1.5em]"
        alt=""
      />
    ),
  },
  davinciresolve: {
    name: "DaVinci Resolve",
    icon: (
      <img
        src="/images/projects/lightshows/resolve.svg"
        className="w-[1.5em] rounded-full"
        alt=""
      />
    ),
  },
  qlab: {
    name: "QLab",
    icon: <QLabLogo className="h-auto w-[1.5em] rounded-full" alt="" />,
  },
  graphql: {
    name: "GraphQL",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="1.5em"
        height="1.5em"
        fill="color(display-p3 0.8824 0 0.5961)"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 6.90308L87.323 28.4515V71.5484L50 93.0968L12.677 71.5484V28.4515L50 6.90308ZM16.8647 30.8693V62.5251L44.2795 15.0414L16.8647 30.8693ZM50 13.5086L18.3975 68.2457H81.6025L50 13.5086ZM77.4148 72.4334H22.5852L50 88.2613L77.4148 72.4334ZM83.1353 62.5251L55.7205 15.0414L83.1353 30.8693V62.5251Z"
        />
        <circle cx="50" cy="9.3209" r="8.82" />
        <circle cx="85.2292" cy="29.6605" r="8.82" />
        <circle cx="85.2292" cy="70.3396" r="8.82" />
        <circle cx="50" cy="90.6791" r="8.82" />
        <circle cx="14.7659" cy="70.3396" r="8.82" />
        <circle cx="14.7659" cy="29.6605" r="8.82" />
      </svg>
    ),
  },
};

export const projects = [
  {
    name: "Preparedness & Response for Emergency Planning (PREP)",
    id: "prep",
    description:
      "Congressional App Challenge Honorable Mention, PREP helps communities prepare for emergencies by providing real-time weather and wildfire alerts, hospital and shelter locators with turn-by-turn directions, and more.",
    technologies: [
      technologyInformation.nextjs,
      technologyInformation.tailwindcss,
    ],
    url: "https://prep.sidd.studio",
    type: ["web app", "design", "coding"],
    featuredImage: prep_map,
    longDescription: (
      <>
        <div
          className="prose prose-neutral prose-blockquote:before:content-[''] prose-blockquote:after:content-[''] prose-code:before:content-[''] prose-code:after:content-['']"
          style={{ maxWidth: "none" }}
        >
          <p className="text-lg font-medium">
            🏆 <strong>Honorable Mention</strong> in the 2025 Congressional App
            Challenge, Oregon&apos;s First Congressional District.{" "}
            <Link href="https://bonamici.house.gov/media/press-releases/bonamici-announces-winner-oregons-first-congressional-districts-2025">
              Learn more.
            </Link>
          </p>

          <p>
            With the looming risk of a major Cascadia earthquake in the Pacific
            Northwest, my colleague Brian Wei and I created PREP to empower
            anyone, anytime, on any device with access to emergency warnings,
            nearby shelters and hospitals, and other preparedness information at
            the moment they might need it most Because it&apos;s a web
            application, there is no need to download anything. Users simply
            open it in a browser from a phone, tablet, or laptop and are ready
            to go. This means accessibility from anywhere.
          </p>

          <h2>Screenshots (click to enlarge)</h2>
          <PhotoGallery
            photos={[
              <ProductImage
                size="large"
                key="prep_main_page"
                src={prep_main_page}
              />,
              <ProductImage
                size="large"
                key="prep_full_map"
                src={prep_full_map}
              />,
              <ProductImage
                size="large"
                key="prep_checklist"
                src={prep_checklist}
              />,
              <ProductImage
                size="large"
                key="prep_emergency_dialog"
                src={prep_emergency_dialog}
              />,
            ]}
          />

          <h2>Features</h2>

          <h3>Emergency Resources Directory</h3>
          <p>
            From the resource menu, users can access a list of hospitals and
            emergency shelters ordered by distance. On the map itself, users can
            tap overlaid hospital and shelter icons, and in the sidebar, by
            clicking directions, users can obtain turn-by-turn directions from
            their current location. These directions also support walking and
            biking. This allows users who are evacuating or seeking care after
            an emergency to know exactly how to reach their destination. Users
            can utilize this feature to plan ahead in the event of an emergency.
          </p>
          <ul>
            <li>
              For hospitals, the application uses{" "}
              <strong>Google Maps Places API</strong> to pull in information
              including name, address, and rating.
            </li>
            <li>
              For shelters, we integrate publicly available shelter data from
              the official <strong>City of Portland database</strong>. In the
              future, this can be expanded to other cities as most large cities
              have similar databases available.
            </li>
            <li>
              Directions are powered by <strong>Google Routes API</strong> with
              support for driving, walking, and biking so users can get help no
              matter what situation they are in.
            </li>
          </ul>

          <h3>Real-Time National Weather Service Alerts</h3>
          <p>
            Colored polygons on the map represent National Weather Service
            alerts from the official <strong>NWS API</strong>. The polygons take
            the shape of the affected areas. By clicking on them, users can see
            essential information clearly, including the type of advisory, when
            it was issued, when it expires, a summary, and instructions for how
            to respond. When a disaster is imminent (such as a tsunami risk,
            earthquake aftershock, or other hazards), users will be able to see
            it immediately on the map.
          </p>

          <h3>Wildfire Alerts</h3>
          <p>
            PREP pulls in alerts from the{" "}
            <strong>National Interagency Fire Center</strong> through WFIGs.
            Wildfires are displayed on the map with fire icons. By clicking on
            them, users can view essential information in the sidebar including
            the burn area and containment progress.
          </p>

          <h3>Preparedness Checklist</h3>
          <p>
            Survival after a major event depends on preparation. PREP includes a
            comprehensive checklist compiled from various sources. Users can
            mark off items, review what they still need, and print the checklist
            as well. The checklist can be put into full-screen mode for focused
            planning.
          </p>

          <h3>Offline Access</h3>
          <p>
            Every feature in PREP is printable. Users can print directions,
            shelter information, hospital details, the entire resource
            directory, and the preparedness checklist. This ensures that users
            have printed information sheets accessible during an emergency when
            digital devices may not be available.
          </p>

          <h2>Technical Details</h2>
          <p>
            This web application was developed using Next.js—the same framework
            that enterprise-grade applications rely on every day, such as
            Instagram, Facebook, and Netflix.
          </p>
          <p>
            We have implemented an <strong>intelligent caching system</strong>{" "}
            that stores data on the user&apos;s device so the website remains
            operational even with network disruptions. This ensures that the
            application works smoothly and is ready for real-world scenarios.
          </p>
          <p>
            In any disaster scenario, infrastructure may be damaged and cell
            networks may go down. Having device-agnostic, offline, printable,
            and location-aware preparedness tools means users are not caught
            unprepared.
          </p>

          <h2>Community Impact</h2>
          <p>
            Anyone living or working in a region at risk of natural disaster,
            especially in the Pacific Northwest with the threat of a potential
            Cascadia earthquake, needs an easy, reliable way to access emergency
            preparedness information. PREP provides clear, actionable
            information when it matters most.
          </p>
          <p>
            With PREP, we hope to empower users in the Portland area to stay
            prepared—not just in the moment of crisis, but ahead of it.
          </p>

          <h2>Data Sources & APIs</h2>
          <ul>
            <li>Google Cloud Places API: Hospital information</li>
            <li>Google Routes API: Turn-by-turn directions</li>
            <li>City of Portland Open Data: Emergency shelter locations</li>
            <li>National Weather Service API: Real-time weather alerts</li>
            <li>
              National Interagency Fire Center (WFIGs): Wildfire tracking and
              alerts
            </li>
          </ul>

          <h2>Video Overview</h2>

          <div className="my-8 aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/TyQanUBuZEQ"
              title="PREP - Congressional App Challenge Submission"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <p className="text-sm opacity-70">
            Developed by Brian Wei and Siddharth Modha for the 2025
            Congressional App Challenge.{" "}
            <Link href="https://bonamici.house.gov/media/press-releases/bonamici-announces-winner-oregons-first-congressional-districts-2025">
              Recognized by Congresswoman Suzanne Bonamici.
            </Link>
          </p>
        </div>
      </>
    ),
  },
  {
    name: "RESOLVED Storefront",
    id: "resolved",
    description:
      "A full-scale, custom-designed e-commerce platform for RESOLVED, an editing toolkit for DaVinci Resolve. I designed and developed every aspect of the storefront with Next.js and GraphQL to create a high-performance shopping experience trusted by thousands of editors worldwide.",
    technologies: [
      technologyInformation.nextjs,
      technologyInformation.tailwindcss,
    ],
    type: ["web app", "e-commerce", "design", "coding"],
    longDescription: (
      <>
        <h2 className="text-2xl font-bold">Highlights</h2>
        <div className="mb-4 w-full space-x-4">
          <PhotoGallery
            photos={[
              <ProductImage key="resolved_hero" src={resolved_hero} />,
              <ProductImage key="resolved_product" src={resolved_product} />,
              <ProductImage key="resolved_reviews" src={resolved_reviews} />,
              <ProductImage
                key="resolved_suggested_products"
                src={resolved_suggested_products}
              />,
            ]}
          />
          <p className="mb-6 text-center text-base opacity-60">
            <Link href="https://resolvedtools.com">resolvedtools.com</Link>
          </p>
        </div>

        <div
          className="prose prose-neutral prose-blockquote:before:content-[''] prose-blockquote:after:content-[''] prose-code:before:content-[''] prose-code:after:content-['']"
          style={{ maxWidth: "none" }}
        >
          <p>
            RESOLVED is an established editing toolkit for DaVinci Resolve,
            trusted by thousands of professional editors. I designed and
            engineered the entire storefront from the ground up, with a modern
            aesthetic and robust e-commerce functionality. Every aspect
            regarding its performance, design, and user experience was
            custom-built to deliver a seamless, high-performance experience.
          </p>
          <ul>
            <li>
              Full-stack development using Next.js and TailwindCSS for a
              lightning-fast, responsive UI.
            </li>
            <li>
              Using Shopify&apos;s GraphQL integration for real-time product
              management, ease of use for the RESOLVED team, and secure
              checkout.
            </li>
            <li>
              Designed a unique, professional identity and visual experience for
              the platform.
            </li>
            <li>
              With a heavy emphasis on performance and reliability, the
              storefront is optimized for speed, scalability, and flawless user
              experience.
            </li>
          </ul>
          <p>
            Building this platform was a much larger technical and creative
            challenge than I could have anticipated, but was ultimately very
            rewarding for me and the RESOLVED team. The result is a storefront
            that powers a 4.9/5 rated product with 2,500+ happy customers
            worldwide, and I am incredibly proud of the work we have done.
          </p>
        </div>
      </>
    ),
    featuredImage: resolved_hero,
  },
  {
    name: 'Projections for Lincoln High School\'s "Amélie"',
    id: "amelie",
    description:
      'I established the projections department, designed all the media, and installed the equipment for Lincoln High School\'s theatrical production of "Amélie".',
    technologies: [
      technologyInformation.davinciresolve,
      technologyInformation.qlab,
    ],
    type: ["technical theatre", "video"],
    longDescription: (
      <>
        <h2 className="text-2xl font-bold">Highlights</h2>
        <div className="w-full space-x-4">
          <PhotoGallery
            photos={[
              <ProductImage key="amelie_fish_dead" src={amelie_fish_dead} />,
              <ProductImage key="amelie_dufayel" src={amelie_dufayel} />,
              <ProductImage key="amelie_confetti" src={amelie_confetti} />,
              <ProductImage key="amelie_apartment" src={amelie_apartment} />,
              <ProductImage
                key="amelie_booth_went_bright"
                src={amelie_booth_went_bright}
              />,
              <ProductImage key="amelie_elton_john" src={amelie_elton_john} />,
              <ProductImage key="amelie_flyers" src={amelie_flyers} />,
              <ProductImage
                key="amelie_final_photo"
                src={amelie_final_photo}
              />,
              <ProductImage
                key="amelie_final_works"
                src={amelie_final_works}
              />,

              <ProductImage key="amelie_flyers_2" src={amelie_flyers_2} />,
              <ProductImage
                key="amelie_girl_with_the_glass"
                src={amelie_girl_with_the_glass}
              />,

              <ProductImage key="amelie_halfway" src={amelie_halfway} />,
              <ProductImage key="amelie_hipolito" src={amelie_hipolito} />,
              <ProductImage key="amelie_map_gnome" src={amelie_map_gnome} />,
              <ProductImage
                key="amelie_memorial_vid"
                src={amelie_memorial_vid}
              />,
              <ProductImage
                key="amelie_metro_station"
                src={amelie_metro_station}
              />,
              <ProductImage key="amelie_notre_dame" src={amelie_notre_dame} />,
              <ProductImage
                key="amelie_two_windmills"
                src={amelie_two_windmills}
              />,
            ]}
          />
          <p className="mb-6 text-center text-base opacity-60">
            Some photos by{" "}
            <Link href="https://www.instagram.com/maximillion_photos/">
              the incredible Max Hurwitz
            </Link>
            !
          </p>
        </div>

        <div
          className="prose prose-neutral prose-blockquote:before:content-[''] prose-blockquote:after:content-[''] prose-code:before:content-[''] prose-code:after:content-['']"
          style={{ maxWidth: "none" }}
        >
          <p>
            This was probably the most complicated project I&apos;ve ever taken
            charge of.{" "}
          </p>
          <p>
            Because of the nature of the technical theatre program at my high
            school, all of the technical aspects of the shows we put on are
            managed by student leaders. Therefore, when the technical theatre
            director approached me to try and see how viable it would be to run
            projections in this show for the first time in our high school&#39;s
            history, I was so honored and excited to get to work.
          </p>
          <p>
            Over the next month, I went through many, many different hurdles. It
            seemed like everything was working against this project. Anything
            from the placement of the projectors, to the computers crashing, to
            the projectors disconnecting mid show... It was a ton of trial and
            error to try and make this happen. But, at the end of the day, the
            shows happened and I learned the most things I have ever learned in
            a project before. I am eternally grateful to my tech theatre
            director for presenting me with such a valuable hands-on
            opportunity, and oh my god I hate projectors.
          </p>

          <h3>Designing</h3>

          <p>
            Three types of projections were used in this show: animations,
            scenery, and miscellaneous. I used DaVinci Resolve to create all
            three.
          </p>

          <ol>
            <li>
              <p>
                For the animations, I relied on Resolve&apos;s Fusion page to
                hand animate whatever that needed to move. These ranged from
                drawings meant to emulate a child&apos;s style of drawing, to
                boats sailing the sea, to realistic fireworks. For the drawings,
                I hand animated each frame using Fusion&apos;s Paint node in
                order to recreate that hand-drawn feel. These drawings were used
                during the scenes when Amélie is a child, so it was crucial for
                them to be imperfect, just like a child&apos;s drawing, as if it
                was the mind of Amélie being projected. For polygons that had to
                move in repeatable patterns, like the boat sailing the sea, I
                drew out the polygons of the waves and boat. Then, I relied on
                keyframes to do the heavy lifting; they took care of moving the
                boat smoothly and repeatedly. Finally, for &quot;Goodbye
                Amélie&quot;, I really wanted to make the vibe feel like a
                concert, so I spent a couple days making confetti and emulating
                pyrotechnic effects. To make some fireworks, for example, I
                watched many tutorials and made my own custom particle system to
                look like fireworks exploding. This gave me complete creative
                control of the colors, placement, shapes, and sizes of each
                firework (at the expense of my computer exploding).
              </p>
            </li>

            <li>
              <p>
                To create the scenery, I used free stock photos and videos,
                overlaid them together, and created the scenes of the Two
                Windmills Cafe, Amélie&apos;s apartment, and the Metro Station.
                Below is an animation demonstrating how this process works:
              </p>

              <Image
                src="/images/projects/2025-amelie-projections/scenery-animation-example.gif"
                alt="Scenery Animation"
                width={0}
                height={0}
                className="h-auto w-full rounded-lg border-2 border-neutral-200"
              />
            </li>

            <li>
              <p>
                Finally, all the random projections that needed to be included
                fall into the miscellaneous topic. These were the most fun to
                design, as they were used to play specific roles. This means
                that their purpose was clear, but the way in which they were
                designed was up to me! My favorite example of this is during
                &quot;Thin Air&quot;, when I created a 3D scene to try and make
                a parallax effect of the flyers flying towards the camera. I
                used a bunch of MediaIn nodes connected to ImagePlanes in the
                Fusion page, connected those to a 3D Merge node, and finally
                keyframed the camera to slowly move through them and I think the
                effect really paid off!
              </p>

              <Image
                src="/images/projects/2025-amelie-projections/thin-air-flyers-fusion.png"
                alt="Screenshot of the Fusion page in DaVinci Resolve"
                width={2559}
                height={1391}
                className="h-auto w-full rounded-lg border-2 border-neutral-200"
              />

              <p className="mb-12 text-center text-base opacity-60">
                Please excuse the messy nodes, I did this literally opening
                night!
              </p>

              <Image
                src="/images/projects/2025-amelie-projections/thin-air-flyers-live.gif"
                alt="The finished flyers animation when projected"
                width={2558}
                height={1307}
                className="h-auto w-full rounded-lg border-2 border-neutral-200"
              />

              <p className="mb-12 text-center text-base opacity-60">
                Thank you to Richard Mills for taking this video!
              </p>
            </li>
          </ol>

          <h3>Installing</h3>

          <p>
            After all the media was designed, I had to install the projectors
            and computers. This was a huge challenge, as I had to figure out how
            to mount the projectors, where to place them, and how to connect
            them to the computers. Thankfully, my friend{" "}
            <Link href="https://brook3.works">Brooke</Link> was able to help me
            a ton with this step. She took care of the patching and networking
            of the projectors for me!
          </p>

          <p>
            I ended up using two projectors: a giant 18 000 lumen watercooled
            laser projector to hit the entire set, and a smaller 8 000 lumen
            projector focused purely on backwards projection for the center
            window. The smaller projector was easy enough to set up, but we
            spent many, many days trying to mount the bigger projector in
            various configurations (on the balcony rail? not enough room! in the
            spot booth? not enough range! on stage? too many shadows! in the
            walkway? fire hazard!), but eventually we simply placed it in the
            balcony seating itself. Unfortunately, this meant that we had to
            move the projector when another group needed to use the balcony, but
            it was the only way to get it to work nicely.
          </p>

          <p>
            Once all the projectors were mounted, I felt like I was finally able
            to start...
          </p>

          <h3>Projecting!</h3>

          <p>
            After everything was designed and ready, I used QLab&apos;s mapping
            system to block out (map out) every important part of the stage I
            would potentially project on. This included the scrim, floating
            rectangles, back window, smaller windows, trim, and whole set. Below
            is a reenactment of how the maps, called &quot;surfaces&quot; by
            QLab, looked:
          </p>
          <Image
            src="/images/projects/2025-amelie-projections/qlab-maps.png"
            alt="QLab Maps"
            width={1948}
            height={1154}
            className="h-auto w-full rounded-lg border-2 border-neutral-200"
          />

          <p>
            Using these surfaces, I could easily assign the location of each of
            my video cues. None of these surfaces needed to be used at all, but
            having them easily available made the mapping process faster and
            more consistent. Additionally, this ended up being my saving grace
            the day of our opening night when we had to buy a new Mac Mini in
            order to reduce some rendering issues we were experiencing (since we
            were previously using an older M1 Mac Mini, the upgrade to an M4 Mac
            Mini was necessary!!). Even though QLab had reworked the entire
            video system in the newer version of QLab I had to use, I was able
            to quickly rework the maps and reassign each cue to the updated
            surface. This saved me loads of time, as I didn&apos;t have to
            manually remap each cue&apos;s location indivdually.
          </p>

          <p>
            Overall, this was an incredible experience that I am, again, so
            grateful to have been a part of. I learned so much about projectors,
            video editing, animation, collaboration, QLab, and the horrors of
            giant projectors. I am so thankful to my tech theatre director for
            giving me this opportunity, and the entire cast & amazing crew for
            doing this show with me!!!
          </p>
        </div>
      </>
    ),
    featuredImage: amelie_confetti,
  },
  {
    name: "Lincoln HS Computer Science Association",
    id: "lhscsa",
    description:
      "I designed and coded the website of Lincoln High School's Computer Science Association.",
    technologies: [
      technologyInformation.nextjs,
      technologyInformation.tailwindcss,
    ],
    type: ["design", "coding", "web app"],
    url: "https://lhscsa.com",
    longDescription: (
      <>
        <p>
          I designed and coded the website of Lincoln High School&apos;s
          Computer Science Association. This was a fun exercise to try and blend
          brutalist design with a modern website, and I think it turned out
          pretty well.
        </p>

        <p className="mt-2">
          The website includes an interactive features section, or
          &quot;bento&quot; section, an email collection system (that runs using
          Discord webhooks), an about page, and more (including a secret page!).
        </p>

        <h2 className="mt-12 text-2xl font-bold">Screenshots</h2>
        <div className="w-full space-x-4">
          <PhotoGallery
            photos={[
              <ProductImage key="lhscsa_splash_dark" src={lhscsa_splash} />,
              <ProductImage key="lhscsa_bento_dark" src={lhscsa_bento} />,
              <ProductImage key="lhscsa_about_dark" src={lhscsa_about} />,
            ]}
          />
        </div>
      </>
    ),
    featuredImage: lhscsa_splash,
  },
  {
    name: "PurAI's Website",
    id: "pur-ai",
    description:
      "I designed and coded the documentation and showcase of PurAI, a fictional project focused on providing high-quality AI for free.",
    technologies: [
      technologyInformation.tailwindcss,
      technologyInformation.nextjs,
    ],
    type: ["design", "coding", "web app"],
    url: "https://purai.sidd.studio",
    longDescription: (
      <div
        className="prose prose-neutral prose-blockquote:before:content-[''] prose-blockquote:after:content-[''] prose-code:before:content-[''] prose-code:after:content-['']"
        style={{ maxWidth: "none" }}
      >
        <blockquote>
          This project has been shutdown. The website is still up and running,
          but the service advertised no longer exists.
        </blockquote>

        <h2>Screenshots</h2>
        <div className="w-full space-x-4">
          <PhotoGallery
            photos={[
              <ProductImage key="purai_splash" src={purai_splash} />,
              <ProductImage key="purai_docs_1" src={purai_docs_1} />,
              <ProductImage key="purai_docs_2" src={purai_docs_2} />,
              <ProductImage key="purai_docs_3" src={purai_docs_3} />,
              <ProductImage key="purai_showcase_1" src={purai_showcase_1} />,
              <ProductImage key="purai_showcase_2" src={purai_showcase_2} />,
              <ProductImage key="purai_pricing" src={purai_pricing} />,
            ]}
          />
        </div>
      </div>
    ),
    featuredImage: purai_splash,
  },
  {
    name: "cobalt-ext",
    id: "cobalt-ext",
    description:
      " a browser extension that allows you to conveniently download Instagram reels, YouTube videos/shorts, and videos on Twitter, with a thoughtful design. Powered, but not affiliated with, cobalt.tools ",
    technologies: [technologyInformation.js, technologyInformation.html],
    type: ["browser extension", "coding"],
    url: "https://github.com/Sidd-underscore/cobalt-ext",
    longDescription: (
      <div
        className="prose prose-neutral prose-blockquote:before:content-[''] prose-blockquote:after:content-[''] prose-code:before:content-[''] prose-code:after:content-['']"
        style={{ maxWidth: "none" }}
      >
        <blockquote>
          the most convenient way to save what you love, right where you need it
        </blockquote>
        <p>
          <code>cobalt-ext</code> a browser extension that allows you to
          conveniently download Instagram reels, YouTube videos/shorts, and
          videos on Twitter. it uses the design system of each{" "}
          <a href="#supported-services">service it supports</a> to create
          beautiful and functional interfaces that fit right in
        </p>
        <blockquote>
          WARNING
          <br />
          although <code>cobalt-ext</code> redirects you to{" "}
          <a href="https://cobalt.tools">cobalt.tools</a> in order to download
          your content, it is not affiliated with cobalt.tools
        </blockquote>
        <h2 id="usage">usage</h2>
        <blockquote>
          NOTE
          <br />
          <code>cobalt-ext</code> will not be available on the Chrome Web Store
          or Firefox Add-ons store. therefore, you must install it manually.
        </blockquote>
        <ol>
          <li>
            download the latest release from{" "}
            <a href="https://github.com/Sidd-underscore/cobalt-ext/releases/latest">
              the releases tab
            </a>
          </li>
          <li>unzip the folder and place it somewhere you will remember</li>
          <li>
            <p>
              this varies depending on your browser: on Firefox (or forks of it,
              such as Zen):
            </p>
            <ul>
              <li>
                go to &quot;<a href="about:debugging">about:debugging</a>&quot;,
                click on &quot;This Firefox&quot;, and click on &quot;Load
                Temporary Add-on&quot;
              </li>
              <li>
                <p>
                  in the window that opens, navigate to the folder you unzipped
                  and open &quot;manifest.json&quot;
                </p>
              </li>
            </ul>
            <p>
              on Chromium-based browsers (such as Google Chrome, Brave, Opera,
              Arc):
            </p>
            <ul>
              <li>
                go to &quot;
                <a href="chrome://extensions">chrome://extensions</a>&quot;,
                enable developer mode, and click on &quot;Load unpacked&quot;
              </li>
              <li>in the window that opens, select the folder you unzipped</li>
            </ul>
          </li>
          <li>
            that&#39;s it! find an instagram reel, a twitter video, or a youtube
            video, and click on the download button :)
          </li>
        </ol>
        <h2 id="supported-services">supported services</h2>
        <ul>
          <li>
            <input type="checkbox" readOnly checked /> Instagram Reels
          </li>
          <li>
            <input type="checkbox" readOnly checked /> Twitter Videos
          </li>
          <li>
            <input type="checkbox" readOnly checked /> YouTube Shorts
          </li>
          <li>
            <input type="checkbox" readOnly checked /> YouTube Videos
          </li>
          <li>
            <input type="checkbox" readOnly /> SoundCloud
          </li>
          <li>
            <input type="checkbox" readOnly /> TikTok
          </li>
          <li>
            <input type="checkbox" readOnly /> Facebook Videos
          </li>
        </ul>
        <h2 id="screenshots">screenshots</h2>
        <PhotoGallery
          photos={[
            <ProductImage
              key="cobalt-ext_intro"
              src="https://github.com/Sidd-underscore/cobalt-ext/blob/main/screenshots/intro.png?raw=true"
              alt="cobalt-ext integrates directly with services you already use to make your experience with cobalt.tools even more seamless"
              staticImage={true}
            />,
            <ProductImage
              key="cobalt-ext_instagram"
              src="https://github.com/Sidd-underscore/cobalt-ext/blob/main/screenshots/yt-videos.png?raw=true"
              alt="supports downloading youtube videos"
              staticImage={true}
            />,
            <ProductImage
              key="cobalt-ext_yt-shorts"
              src="https://github.com/Sidd-underscore/cobalt-ext/blob/main/screenshots/yt-shorts.png?raw=true"
              alt="supports downloading youtube shorts"
              staticImage={true}
            />,
            <ProductImage
              key="cobalt-ext_instagram-reels"
              src="https://github.com/Sidd-underscore/cobalt-ext/blob/main/screenshots/instagram-reels.png?raw=true"
              alt="supports downloading instagram reels"
              staticImage={true}
            />,
            <ProductImage
              key="cobalt-ext_twitter"
              src="https://github.com/Sidd-underscore/cobalt-ext/blob/main/screenshots/twitter-videos.png?raw=true"
              alt="supports downloading twitter videos"
              staticImage={true}
            />,
          ]}
        />
        <h2 id="contributing">contributing</h2>
        <p>
          <code>cobalt-ext</code> is open source, and contributions are welcome!
          if you have any ideas, suggestions, or bugs to report, please{" "}
          <a href="https://github.com/Sidd-underscore/cobalt-ext/issues/new">
            open an issue
          </a>{" "}
          or{" "}
          <a href="https://github.com/Sidd-underscore/cobalt-ext/pulls">
            make a pull request
          </a>
        </p>
        <h2 id="license">license</h2>
        <p>
          <code>cobalt-ext</code> is licensed under the{" "}
          <a href="https://choosealicense.com/licenses/mit/">MIT license</a>
        </p>
      </div>
    ),
    featuredImage: cobalt_ext,
  },
  {
    name: "Lightshows",
    id: "lightshows",
    description: "Making lights sync to music.",
    technologies: [
      technologyInformation.capture,
      technologyInformation.etceos,
      technologyInformation.davinciresolve,
    ],
    type: ["lighting", "video"],
    url: "",
    projectPath: "/lightshows",
    featuredImage: lightshows_teaser,
  },
];
