import Image from "next/image";

import purai_splash from "@/public/images/purai/purai-splash.png";
import purai_docs_1 from "@/public/images/purai/purai-docs-1.png";
import purai_docs_2 from "@/public/images/purai/purai-docs-2.png";
import purai_docs_3 from "@/public/images/purai/purai-docs-3.png";
import purai_showcase_1 from "@/public/images/purai/purai-showcase-1.png";
import purai_showcase_2 from "@/public/images/purai/purai-showcase-2.png";
import purai_pricing from "@/public/images/purai/purai-pricing.png";
import { PhotoGallery } from "@/components/ui/photo-gallery";

const ProductImage = ({ src }) => {
  return (
    <Image
      height={1080}
      width={1024}
      alt=""
      quality={100}
      placeholder="blur"
      className="h-96 w-auto max-w-none rounded-lg"
      src={src}
    />
  );
};

export const projects = [
  {
    name: "PurAI's Website",
    id: "pur-ai",
    description:
      "I designed and coded the documentation and showcase of PurAI, a project focused on providing high-quality AI for free.",
    technologies: ["Nextra", "TailwindCSS", "Nextjs"],
    url: "https://purai.purlabs.xyz",
    longDescription: (
      <>
        <h2 className="text-2xl font-bold">Screenshots</h2>
        <div className="w-full space-x-4">
          <PhotoGallery
            scroll={698.09}
            photos={[
              <ProductImage key={purai_splash.src} src={purai_splash} />,
              <ProductImage key={purai_docs_1.src} src={purai_docs_1} />,
              <ProductImage key={purai_docs_2.src} src={purai_docs_2} />,
              <ProductImage key={purai_docs_3.src} src={purai_docs_3} />,
              <ProductImage key={purai_showcase_1.src} src={purai_showcase_1} />,
              <ProductImage key={purai_showcase_2.src} src={purai_showcase_2} />,
              <ProductImage key={purai_pricing.src} src={purai_pricing} />,
            ]}
          />
        </div>
      </>
    ),
  },
  {
    name: "Mastodon Template",
    id: "mastodon",
    description:
      "Through a Replit Bounty, I created a one-click runable instance of Mastodon, a free and open-source Twitter alternative. It is hosted on Replit, but the code works everywhere. In-depth documentation on everything from localhosting to the folder/file explanation (and more!) is also provided!",
    technologies: ["Ruby", "Bash Scripts"],
    url: "https://replit.com/@cool-sidd/Mastodon?v=1",
    longDescription: (
      <div className="prose prose-zinc dark:prose-invert" style={{maxWidth: "none"}}>
        <h2 id="about-this-repl">About this Repl</h2>
        <blockquote>
          The current configuration for the Repl is <em>development</em>. To
          upgrade to <em>production</em>, follow the{" "}
          <a href="#upgrading-to-production">instructions</a>
        </blockquote>
        <p>
          This is a Bash repl, which is essentially just a shell where programs
          can be run. Being a <em>one-click runable</em> repl, all you have to
          do to have your very own Mastodon instance is click the run button. I
          also reccomend you give this repl an <strong>8x boost</strong> and{" "}
          <strong>enable Always On</strong>. Both of these options are availible
          through Hacker plans.
        </p>
        <h3 id="how-this-repl-works">How this Repl Works</h3>
        <p>
          All the files you view were generated through cloning the{" "}
          <a href="https://github.com/mastodon/mastodon">GitHub Repo</a> of
          Mastodon and scripts located in <code>start.sh</code>. Said scripts
          initiate (in order):
        </p>
        <ol>
          <li>
            <strong>
              <a href="https://redis.io/">Redis</a>
            </strong>
            , that caches for PostgreSQL.
          </li>
          <li>
            <strong>
              <a href="https://www.postgresql.org/">PostgreSQL</a>
            </strong>
            , the database system
          </li>
          <li>
            <strong>
              <a href="https://www.nginx.com/">Nginx</a>
            </strong>
            , used as a reverse proxy (it &quot;sits in front of web servers and
            forwards client (e.g. web browser) requests to those web
            servers&quot; -{" "}
            <a href="https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/#:~:text=A%20reverse%20proxy%20is%20a,security%2C%20performance%2C%20and%20reliability.">
              Cloudflare, What is a reverse proxy?
            </a>
            )
          </li>
          <li>
            Mastodon! (using{" "}
            <strong>
              <a href="https://webpack.js.org/">Webpack</a>
            </strong>
            )
          </li>
        </ol>
        <p>
          The Mastodon files in the GitHub repo are located in{" "}
          <code>./live</code>. The rest of the files and folders are explained{" "}
          <a href="#folder-file-explanation">here</a>.
        </p>
        <h3 id="tech-stack">Tech Stack</h3>
        <ul>
          <li>
            <strong>
              <a href="https://rubyonrails.org/">Ruby on Rails</a>
            </strong>{" "}
            powers the REST API and other web pages
          </li>
          <li>
            <strong>
              <a href="https://reactjs.org/">React.js</a>
            </strong>{" "}
            and{" "}
            <strong>
              <a href="https://redux.js.org/">Redux</a>
            </strong>{" "}
            are used for the dynamic parts of the interface
          </li>
          <li>
            <strong>
              <a href="https://nodejs.org/">Node.js</a>
            </strong>{" "}
            powers the streaming API
          </li>
        </ul>
        <h3 id="folder-file-explanation">Folder/File Explanation</h3>
        <table>
          <thead>
            <tr>
              <th>
                <strong>File/Folder name</strong>
              </th>
              <th>
                <strong>Location</strong>
              </th>
              <th>
                <strong>Description</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>start.sh</td>
              <td>
                <code>~/Mastodon/start.sh</code>
              </td>
              <td>Starts up the Mastodon instance.</td>
            </tr>
            <tr>
              <td>README.md</td>
              <td>
                <code>~/Mastodon/README.md</code>
              </td>
              <td>
                Provides details about this Repl and instructions on how to use
                it
              </td>
            </tr>
            <tr>
              <td>postgresql.log</td>
              <td>
                <code>~/Mastodon/postgresql.log</code>
              </td>
              <td>PostgreSQL logs</td>
            </tr>
            <tr>
              <td>postgresql.conf.tpl</td>
              <td>
                <code>~/Mastodon/postgresql.conf.tpl</code>
              </td>
              <td>
                PostgreSQL&#39;s main configuration file and the primary source
                of configuration parameter settings.
              </td>
            </tr>
            <tr>
              <td>nginx.conf</td>
              <td>
                <code>~/Mastodon/postgresql.conf.tpl</code>
              </td>
              <td>
                Nginx configuration file, similar purpose as the file above
              </td>
            </tr>
            <tr>
              <td>mime.types</td>
              <td>
                <code>~/Mastodon/mime.types</code>
              </td>
              <td>
                A very large list of{" "}
                <a href="https://www.iana.org/assignments/media-types/media-types.xhtml">
                  MIME Types
                </a>
              </td>
            </tr>
            <tr>
              <td>freedesktop.org.xml</td>
              <td>
                <code>~/Mastodon/freedesktop.org.xml</code>
              </td>
              <td>
                Purpose is quite unknown. My research shows a link to Ruby on
                Rails, but not exactly sure what part it plays. Delete at your
                own risk.
              </td>
            </tr>
            <tr>
              <td>dump.rdb</td>
              <td>
                <code>~/Mastodon/dump.rdb</code>
              </td>
              <td>Redis backup file.</td>
            </tr>
            <tr>
              <td>postgres/</td>
              <td>
                <code>~/Mastodon/postgres/</code>
              </td>
              <td>
                Where PostgreSQL keeps all the data inserted in the database
              </td>
            </tr>
            <tr>
              <td>logs/</td>
              <td>
                <code>~/Mastodon/logs/</code>
              </td>
              <td>
                Folder that contains all the important logs that for your
                server. Refer to them for errors.
              </td>
            </tr>
            <tr>
              <td>logs/nginx.pid</td>
              <td>
                <code>~/Mastodon/logs/nginx.pid</code>
              </td>
              <td>Stores the main process ID of the nginx process</td>
            </tr>
            <tr>
              <td>logs/error.log</td>
              <td>
                <code>~/Mastodon/logs/error.log</code>
              </td>
              <td>Nginx error logs.</td>
            </tr>
            <tr>
              <td>live/</td>
              <td>
                <code>~/Mastodon/live/</code>
              </td>
              <td>
                Folder that contains all of Mastodon&#39;s code. This folder
                contains the code that is used when rendering client pages and
                fulfilling backend requests.
              </td>
            </tr>
            <tr>
              <td>data/</td>
              <td>
                <code>~/Mastodon/data/</code>
              </td>
              <td>
                PostgreSQL data folder. Contains, as the name implies, data :)
              </td>
            </tr>
            <tr>
              <td>cache/</td>
              <td>
                <code>~/Mastodon/cache/</code>
              </td>
              <td>Cache.</td>
            </tr>
          </tbody>
        </table>
        <h3 id="running-this-repl-locally">Running this Repl locally</h3>
        <p>
          Unfortunately, this Repl is designed to run on Replit&#39;s machines,
          and cannot be easily converted to run on a personal computer. However,
          this isn&#39;t necessarily a bad thing, since it literally will only
          take one click of Replit&#39;s &quot;Run&quot; button to have this
          instace running.
        </p>
        <h3 id="customizing-this-mastodon-instance">
          Customizing this Mastodon instance
        </h3>
        <p>
          To truly have your own verion of Mastodon, it is essential that it
          works correctly and displays your Mastodon instance&#39;s information.
          To do this:
        </p>
        <ol>
          <li>
            Head to the <code>.env.production.sample</code> file in the{" "}
            <code>live/</code> folder
          </li>
          <li>
            Enter the correct information
            <ul>
              <li>Details and instructions are already there!</li>
              <li>
                Mailgun is used for the SMPT server, but it can be changed to
                whatever you like
              </li>
            </ul>
          </li>
          <li>Restart the server!</li>
        </ol>
        <h2 id="upgrading-to-production">Upgrading to Production</h2>
        <p>Upgrading is quite simple:</p>
        <ol>
          <li>
            Head over to <code>start.sh</code> and edit{" "}
            <strong>line 24, column 21 through 32</strong> to say{" "}
            <code>production</code> instead of <code>development</code>
          </li>
          <li>
            Jump to <code>.replit</code> and edit{" "}
            <strong>line 12, column 12 through 23</strong> to say{" "}
            <code>production</code> instead of <code>development</code>
          </li>
          <li>Restart the server!</li>
          <li>🎆</li>
        </ol>
        <hr />
        <h2 id="contributing">Contributing</h2>
        <p>
          I 💖 help with code, especially on a project like this. To add more,
          fix my typos or improve my code in any way shape or form, head over to
          the <a href="https://github.com/Sidd-underscore/Mastodon">GitHub</a>,
          do your edits and submit a pull request. Further discussing may insue
          between you, me or others.
        </p>
        <h2 id="credits-">Credits 💝</h2>
        <p>
          Kudos to{" "}
          <a href="https://blog.replit.com/setting-up-a-mastodon">
            this amazing Replit blog article
          </a>{" "}
          by <a href="https://areknawo.com/">Arec Nawo</a>. Follow them on{" "}
          <a href="https://twitter.com/areknawo">Twitter</a>,{" "}
          <a href="https://www.facebook.com/areknawoblog">Facebook</a> and check
          out their <a href="https://github.com/areknawo">GitHub</a>!
        </p>
      </div>
    ),
  },
 // {
 //   name: "Mythos' Website",
 //   id: "mythos",
 //   description:
 //     "As part of a Replit Bounty, I brought the amazing Discord bot Mythos to life with a website, complete with a dashboard, stats, and even an API. ",
 //   technologies: ["Nextjs", "shadcn/ui", "TailwindCSS"],
 //   url: "https://mythosbot.com",
 // },
];
