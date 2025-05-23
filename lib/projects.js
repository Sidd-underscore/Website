/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import purai_splash from "@/public/images/projects/purai/purai-splash.png";
import purai_docs_1 from "@/public/images/projects/purai/purai-docs-1.png";
import purai_docs_2 from "@/public/images/projects/purai/purai-docs-2.png";
import purai_docs_3 from "@/public/images/projects/purai/purai-docs-3.png";
import purai_showcase_1 from "@/public/images/projects/purai/purai-showcase-1.png";
import purai_showcase_2 from "@/public/images/projects/purai/purai-showcase-2.png";
import purai_pricing from "@/public/images/projects/purai/purai-pricing.png";

import lhscsa_splash_light from "@/public/images/projects/lhscsa/lhscsa-splash-light.png";
import lhscsa_splash_dark from "@/public/images/projects/lhscsa/lhscsa-splash-dark.png";
import lhscsa_bento_dark from "@/public/images/projects/lhscsa/lhscsa-bento-dark.png";
import lhscsa_bento_light from "@/public/images/projects/lhscsa/lhscsa-bento-light.png";
import lhscsa_about_dark from "@/public/images/projects/lhscsa/lhscsa-about-dark.png";
import lhscsa_about_light from "@/public/images/projects/lhscsa/lhscsa-about-light.png";

import cobalt_ext from "@/public/images/projects/cobalt-ext/cobalt-ext-splash.png";

import lightshows_teaser from "@/public/images/projects/lightshows/snapshots/teaser.jpg";
import lightshows_snapshot_audience from "@/public/images/projects/lightshows/snapshots/audience-pov.jpg";
import lightshows_snapshot_green_purple_pink from "@/public/images/projects/lightshows/snapshots/green-purple-pink.jpg";
import lightshows_snapshot_purple_pink from "@/public/images/projects/lightshows/snapshots/purple-pink.jpg";
import lightshows_snapshot_rainbow from "@/public/images/projects/lightshows/snapshots/rainbow.jpg";
import lightshows_snapshot_sides from "@/public/images/projects/lightshows/snapshots/sides.png";
import lightshows_snapshot_movement_is_going_good from "@/public/images/projects/lightshows/snapshots/movement-is-going-good.png";
import lightshows_better_1 from "@/public/images/projects/lightshows/snapshots/better-1.jpg";
import lightshows_better_6 from "@/public/images/projects/lightshows/snapshots/better-6.jpg";

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
  ruby: {
    name: "Ruby",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 255"
        width="1.5em"
        height="1.5em"
      >
        <defs>
          <linearGradient x1="84.8%" y1="111.4%" x2="58.3%" y2="64.6%" id="a">
            <stop stopColor="#FB7655" offset="0%" />
            <stop stopColor="#FB7655" offset="0%" />
            <stop stopColor="#E42B1E" offset="41%" />
            <stop stopColor="#900" offset="99%" />
            <stop stopColor="#900" offset="100%" />
          </linearGradient>
          <linearGradient x1="116.7%" y1="60.9%" x2="1.7%" y2="19.3%" id="b">
            <stop stopColor="#871101" offset="0%" />
            <stop stopColor="#871101" offset="0%" />
            <stop stopColor="#911209" offset="99%" />
            <stop stopColor="#911209" offset="100%" />
          </linearGradient>
          <linearGradient x1="75.8%" y1="219.3%" x2="39%" y2="7.8%" id="c">
            <stop stopColor="#871101" offset="0%" />
            <stop stopColor="#871101" offset="0%" />
            <stop stopColor="#911209" offset="99%" />
            <stop stopColor="#911209" offset="100%" />
          </linearGradient>
          <linearGradient x1="50%" y1="7.2%" x2="66.5%" y2="79.1%" id="d">
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#E57252" offset="23%" />
            <stop stopColor="#DE3B20" offset="46%" />
            <stop stopColor="#A60003" offset="99%" />
            <stop stopColor="#A60003" offset="100%" />
          </linearGradient>
          <linearGradient x1="46.2%" y1="16.3%" x2="49.9%" y2="83%" id="e">
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#E4714E" offset="23%" />
            <stop stopColor="#BE1A0D" offset="56%" />
            <stop stopColor="#A80D00" offset="99%" />
            <stop stopColor="#A80D00" offset="100%" />
          </linearGradient>
          <linearGradient x1="37%" y1="15.6%" x2="49.5%" y2="92.5%" id="f">
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#E46342" offset="18%" />
            <stop stopColor="#C82410" offset="40%" />
            <stop stopColor="#A80D00" offset="99%" />
            <stop stopColor="#A80D00" offset="100%" />
          </linearGradient>
          <linearGradient x1="13.6%" y1="58.3%" x2="85.8%" y2="-46.7%" id="g">
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#C81F11" offset="54%" />
            <stop stopColor="#BF0905" offset="99%" />
            <stop stopColor="#BF0905" offset="100%" />
          </linearGradient>
          <linearGradient x1="27.6%" y1="21.1%" x2="50.7%" y2="79.1%" id="h">
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#DE4024" offset="31%" />
            <stop stopColor="#BF190B" offset="99%" />
            <stop stopColor="#BF190B" offset="100%" />
          </linearGradient>
          <linearGradient x1="-20.7%" y1="122.3%" x2="104.2%" y2="-6.3%" id="i">
            <stop stopColor="#BD0012" offset="0%" />
            <stop stopColor="#BD0012" offset="0%" />
            <stop stopColor="#FFF" offset="7%" />
            <stop stopColor="#FFF" offset="17%" />
            <stop stopColor="#C82F1C" offset="27%" />
            <stop stopColor="#820C01" offset="33%" />
            <stop stopColor="#A31601" offset="46%" />
            <stop stopColor="#B31301" offset="72%" />
            <stop stopColor="#E82609" offset="99%" />
            <stop stopColor="#E82609" offset="100%" />
          </linearGradient>
          <linearGradient x1="58.8%" y1="65.2%" x2="12%" y2="50.1%" id="j">
            <stop stopColor="#8C0C01" offset="0%" />
            <stop stopColor="#8C0C01" offset="0%" />
            <stop stopColor="#990C00" offset="54%" />
            <stop stopColor="#A80D0E" offset="99%" />
            <stop stopColor="#A80D0E" offset="100%" />
          </linearGradient>
          <linearGradient x1="79.3%" y1="62.8%" x2="23.1%" y2="17.9%" id="k">
            <stop stopColor="#7E110B" offset="0%" />
            <stop stopColor="#7E110B" offset="0%" />
            <stop stopColor="#9E0C00" offset="99%" />
            <stop stopColor="#9E0C00" offset="100%" />
          </linearGradient>
          <linearGradient x1="92.9%" y1="74.1%" x2="59.8%" y2="39.7%" id="l">
            <stop stopColor="#79130D" offset="0%" />
            <stop stopColor="#79130D" offset="0%" />
            <stop stopColor="#9E120B" offset="99%" />
            <stop stopColor="#9E120B" offset="100%" />
          </linearGradient>
          <linearGradient x1="56.6%" y1="101.7%" x2="3.1%" y2="12%" id="o">
            <stop stopColor="#8B2114" offset="0%" />
            <stop stopColor="#8B2114" offset="0%" />
            <stop stopColor="#9E100A" offset="43%" />
            <stop stopColor="#B3100C" offset="99%" />
            <stop stopColor="#B3100C" offset="100%" />
          </linearGradient>
          <linearGradient x1="30.9%" y1="35.6%" x2="92.5%" y2="100.7%" id="p">
            <stop stopColor="#B31000" offset="0%" />
            <stop stopColor="#B31000" offset="0%" />
            <stop stopColor="#910F08" offset="44%" />
            <stop stopColor="#791C12" offset="99%" />
            <stop stopColor="#791C12" offset="100%" />
          </linearGradient>
          <radialGradient
            cx="32%"
            cy="40.2%"
            fx="32%"
            fy="40.2%"
            r="69.6%"
            id="m"
          >
            <stop stopColor="#A80D00" offset="0%" />
            <stop stopColor="#A80D00" offset="0%" />
            <stop stopColor="#7E0E08" offset="99%" />
            <stop stopColor="#7E0E08" offset="100%" />
          </radialGradient>
          <radialGradient
            cx="13.5%"
            cy="40.9%"
            fx="13.5%"
            fy="40.9%"
            r="88.4%"
            id="n"
          >
            <stop stopColor="#A30C00" offset="0%" />
            <stop stopColor="#A30C00" offset="0%" />
            <stop stopColor="#800E08" offset="99%" />
            <stop stopColor="#800E08" offset="100%" />
          </radialGradient>
        </defs>
        <path
          d="M197.5 167.8 51.9 254.2l188.5-12.8 14.5-190-57.4 116.4Z"
          fill="url(#a)"
        />
        <path d="m240.7 241.3-16.2-111.8-44.1 58.2 60.3 53.6Z" fill="url(#b)" />
        <path d="m240.9 241.3-118.7-9.4-69.6 22 188.3-12.6Z" fill="url(#c)" />
        <path d="m52.7 254 29.7-97.1-65.2 13.9L52.7 254Z" fill="url(#d)" />
        <path d="M180.4 188 153 81.3l-78 73.2L180.3 188Z" fill="url(#e)" />
        <path d="m248.7 82.7-73.8-60.2-20.5 66.4 94.3-6.2Z" fill="url(#f)" />
        <path d="m214.2 1-43.4 24L143.4.7l70.8.3Z" fill="url(#g)" />
        <path d="m0 203.4 18.2-33.2-14.7-39.5L0 203.4Z" fill="url(#h)" />
        <path
          d="m2.5 129.5 14.8 42L81.6 157 155 88.8 175.7 23 143 0 87.6 20.8C70.1 37 36.3 69 35 69.8c-1.2.6-22.4 40.6-32.5 59.7Z"
          fill="#FFF"
        />
        <path
          d="M54.4 54c37.9-37.4 86.7-59.6 105.4-40.7 18.8 18.9-1 64.8-39 102.3-37.8 37.5-86 61-104.7 42-18.8-18.8.5-66 38.3-103.5Z"
          fill="url(#i)"
        />
        <path
          d="m52.7 254 29.5-97.5 97.6 31.4c-35.3 33.1-74.6 61-127 66Z"
          fill="url(#j)"
        />
        <path
          d="m155 88.6 25.2 99.3c29.5-31 56-64.3 68.9-105.6l-94 6.3Z"
          fill="url(#k)"
        />
        <path
          d="M248.8 82.8c10-30.2 12.4-73.7-35-81.8l-38.7 21.5 73.7 60.3Z"
          fill="url(#l)"
        />
        <path
          d="M0 203c1.4 50 37.4 50.7 52.8 51.1l-35.5-82.9L0 203Z"
          fill="#9E1209"
        />
        <path
          d="m155.2 88.8 69.3 42.4c1.4.8 19.7-30.8 23.8-48.6l-93 6.2Z"
          fill="url(#m)"
        />
        <path
          d="m82.1 156.5 39.3 75.9c23.3-12.7 41.5-28 58.1-44.5l-97.4-31.4Z"
          fill="url(#n)"
        />
        <path
          d="m17.2 171.3-5.6 66.4c10.5 14.3 25 15.6 40.1 14.5-11-27.4-32.9-82-34.5-80.9Z"
          fill="url(#o)"
        />
        <path
          d="m174.8 22.7 78.1 11C248.8 16 236 4.5 214.1 1l-39.3 21.7Z"
          fill="url(#p)"
        />
      </svg>
    ),
  },
  bash: {
    name: "Bash",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 32 32"
      >
        <path
          className="fill-black dark:fill-white"
          fillRule="evenodd"
          d="M28.057 6.53 17.952.532a3.8 3.8 0 0 0-3.88 0L3.965 6.53A4.03 4.03 0 0 0 2 10.002v11.996a4.03 4.03 0 0 0 1.948 3.472l10.105 5.998a3.8 3.8 0 0 0 3.88 0L28.04 25.47a4.03 4.03 0 0 0 1.948-3.472V10.002a4.03 4.03 0 0 0-1.93-3.472zM20.23 25.262v.86a.318.318 0 0 1-.148.265l-.512.293c-.08.042-.148 0-.148-.113v-.847a1.66 1.66 0 0 1-1.164.113c-.062-.042-.086-.122-.056-.2l.183-.78a.322.322 0 0 1 .102-.17.18.18 0 0 1 .05-.035.11.11 0 0 1 .08 0 1.41 1.41 0 0 0 1.059-.134 1.41 1.41 0 0 0 .79-1.21c0-.438-.24-.62-.82-.625-.734 0-1.4-.14-1.43-1.224a3.137 3.137 0 0 1 1.186-2.4v-.872a.34.34 0 0 1 .148-.268l.494-.314c.08-.042.148 0 .148.116v.872a1.61 1.61 0 0 1 .967-.116c.07.04.098.128.064.2l-.173.773a.325.325 0 0 1-.138.195c-.02.012-.05.008-.074 0a1.28 1.28 0 0 0-.931.152 1.17 1.17 0 0 0-.706 1.037c0 .395.208.515.907.53.935 0 1.337.423 1.348 1.362a3.346 3.346 0 0 1-1.228 2.53zm5.293-1.45a.201.201 0 0 1-.078.194L22.9 25.558c-.024.02-.06.023-.087.007s-.04-.05-.033-.08v-.66a.184.184 0 0 1 .116-.162l2.516-1.507c.024-.02.06-.023.087-.007s.04.05.033.08v.582zM27.288 9.06l-9.562 5.906c-1.193.706-2.07 1.478-2.07 2.914v11.778c0 .86.353 1.4.882 1.58a3.14 3.14 0 0 1-.53.053 3.13 3.13 0 0 1-1.595-.441L4.308 24.853A3.3 3.3 0 0 1 2.706 22V10.002a3.304 3.304 0 0 1 1.602-2.858l10.105-5.998c.98-.58 2.196-.58 3.176 0l10.105 5.998c.833.504 1.4 1.35 1.552 2.3-.328-.713-1.083-.9-1.962-.395h.003z"
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
};

export const projects = [
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
              <ProductImage
                key="amelie_fish_dead"
                src={{ dark: amelie_fish_dead }}
              />,
              <ProductImage
                key="amelie_dufayel"
                src={{ dark: amelie_dufayel }}
              />,
              <ProductImage
                key="amelie_confetti"
                src={{ dark: amelie_confetti }}
              />,
              <ProductImage
                key="amelie_apartment"
                src={{ dark: amelie_apartment }}
              />,
              <ProductImage
                key="amelie_booth_went_bright"
                src={{ dark: amelie_booth_went_bright }}
              />,
              <ProductImage
                key="amelie_elton_john"
                src={{ dark: amelie_elton_john }}
              />,
              <ProductImage
                key="amelie_flyers"
                src={{ dark: amelie_flyers }}
              />,
              <ProductImage
                key="amelie_final_photo"
                src={{ dark: amelie_final_photo }}
              />,
              <ProductImage
                key="amelie_final_works"
                src={{ dark: amelie_final_works }}
              />,

              <ProductImage
                key="amelie_flyers_2"
                src={{ dark: amelie_flyers_2 }}
              />,
              <ProductImage
                key="amelie_girl_with_the_glass"
                src={{ dark: amelie_girl_with_the_glass }}
              />,

              <ProductImage
                key="amelie_halfway"
                src={{ dark: amelie_halfway }}
              />,
              <ProductImage
                key="amelie_hipolito"
                src={{ dark: amelie_hipolito }}
              />,
              <ProductImage
                key="amelie_map_gnome"
                src={{ dark: amelie_map_gnome }}
              />,
              <ProductImage
                key="amelie_memorial_vid"
                src={{ dark: amelie_memorial_vid }}
              />,
              <ProductImage
                key="amelie_metro_station"
                src={{ dark: amelie_metro_station }}
              />,
              <ProductImage
                key="amelie_notre_dame"
                src={{ dark: amelie_notre_dame }}
              />,
              <ProductImage
                key="amelie_two_windmills"
                src={{ dark: amelie_two_windmills }}
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
          className="prose prose-neutral dark:prose-invert prose-blockquote:before:content-[''] prose-blockquote:after:content-[''] prose-code:before:content-[''] prose-code:after:content-['']"
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
                className="h-auto w-full rounded-lg border-2 border-neutral-200 dark:border-neutral-800"
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
                className="h-auto w-full rounded-lg border-2 border-neutral-200 dark:border-neutral-800"
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
                className="h-auto w-full rounded-lg border-2 border-neutral-200 dark:border-neutral-800"
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
            className="h-auto w-full rounded-lg border-2 border-neutral-200 dark:border-neutral-800"
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
    type: ["design", "coding", "website"],
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
              <ProductImage
                key="lhscsa_splash_dark"
                src={{ dark: lhscsa_splash_dark, light: lhscsa_splash_light }}
              />,
              <ProductImage
                key="lhscsa_bento_dark"
                src={{ dark: lhscsa_bento_dark, light: lhscsa_bento_light }}
              />,
              <ProductImage
                key="lhscsa_about_dark"
                src={{ dark: lhscsa_about_dark, light: lhscsa_about_light }}
              />,
            ]}
          />
        </div>
      </>
    ),
    featuredImage: lhscsa_splash_dark,
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
    type: ["design", "coding", "website"],
    url: "https://purai.sidd.studio",
    longDescription: (
      <div
        className="prose prose-neutral dark:prose-invert prose-blockquote:before:content-[''] prose-blockquote:after:content-[''] prose-code:before:content-[''] prose-code:after:content-['']"
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
              <ProductImage key="purai_splash" src={{ dark: purai_splash }} />,
              <ProductImage key="purai_docs_1" src={{ dark: purai_docs_1 }} />,
              <ProductImage key="purai_docs_2" src={{ dark: purai_docs_2 }} />,
              <ProductImage key="purai_docs_3" src={{ dark: purai_docs_3 }} />,
              <ProductImage
                key="purai_showcase_1"
                src={{ dark: purai_showcase_1 }}
              />,
              <ProductImage
                key="purai_showcase_2"
                src={{ dark: purai_showcase_2 }}
              />,
              <ProductImage
                key="purai_pricing"
                src={{ dark: purai_pricing }}
              />,
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
        className="prose prose-neutral dark:prose-invert prose-blockquote:before:content-[''] prose-blockquote:after:content-[''] prose-code:before:content-[''] prose-code:after:content-['']"
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

export const lightshows = [
  <ProductImage
    alt="lightshows_better_1"
    key="lightshows_better_1"
    src={{ dark: lightshows_better_1 }}
    className="aspect-video h-full w-full"
  />,
  <iframe
    key="Angels For Each Other - Martin Garrix, Arijit Singh | Lightshow"
    className="aspect-video h-full w-full rounded-lg border-2 border-neutral-200 dark:border-neutral-800"
    src="https://www.youtube.com/embed/6nVq0lOSp0Y"
    title="Angels For Each Other - Martin Garrix, Arijit Singh | Lightshow"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />,
  <iframe
    key="Rise  - DJ Isaac  |  Lightshow"
    className="aspect-video h-full w-full rounded-lg border-2 border-neutral-200 dark:border-neutral-800"
    src="https://www.youtube.com/embed/1ndWtmUYq5o"
    title="Rise  - DJ Isaac  |  Lightshow"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />,
  <ProductImage
    alt="lightshows_snapshot_sides"
    key="lightshows_snapshot_sides"
    src={{ dark: lightshows_snapshot_sides }}
    className="aspect-video h-full w-full"
  />,
  <ProductImage
    alt="lightshows_better_6"
    key="lightshows_better_6"
    src={{ dark: lightshows_better_6 }}
    className="aspect-video h-full w-full"
  />,
  <ProductImage
    alt="lightshows_snapshot_audience"
    key="lightshows_snapshot_audience"
    src={{ dark: lightshows_snapshot_audience }}
    className="aspect-video h-full w-full"
  />,
  <iframe
    key="Baddadan  - Chase &amp; Status, Bou (Henry Fong Remix) | Lightshow"
    className="aspect-video h-full w-full rounded-lg border-2 border-neutral-200 dark:border-neutral-800"
    src="https://www.youtube.com/embed/HWh7Jb_952c"
    title="Baddadan  - Chase &amp; Status, Bou (Henry Fong Remix) | Lightshow"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />,
  <ProductImage
    src={{ dark: lightshows_snapshot_purple_pink }}
    alt="lightshows_snapshot_purple_pink"
    key="lightshows_snapshot_purple_pink"
    className="aspect-video h-full w-full"
  />,
  <ProductImage
    alt="lightshows_snapshot_movement_is_going_good"
    key="lightshows_snapshot_movement_is_going_good"
    src={{ dark: lightshows_snapshot_movement_is_going_good }}
    className="aspect-video h-full w-full"
  />,
  <iframe
    key="The Spook (Returns) - KSHMR | Lightshow"
    className="aspect-video h-full w-full rounded-lg border-2 border-neutral-200 dark:border-neutral-800"
    src="https://www.youtube.com/embed/E8QyNwXD09g"
    title="The Spook (Returns) - KSHMR | Lightshow"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />,
  <ProductImage
    src={{ dark: lightshows_snapshot_green_purple_pink }}
    alt="lightshows_snapshot_green_purple_pink"
    key="lightshows_snapshot_green_purple_pink"
    className="aspect-video h-full w-full"
  />,
  <ProductImage
    src={{ dark: lightshows_snapshot_rainbow }}
    alt="lightshows_snapshot_rainbow"
    key="lightshows_snapshot_rainbow"
    className="aspect-video h-full w-full"
  />,
];
