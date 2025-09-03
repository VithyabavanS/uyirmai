import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.VITE_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.VITE_TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
        format: "json",
        ui: {
          router: ({ document }) => {
            return `/?lang=${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Hero Title",
            name: "heroTitle",
          },
          {
            type: "string",
            label: "Hero Subtitle",
            name: "heroSubtitle",
          },
          {
            type: "string",
            label: "Hero Button Text",
            name: "heroButton",
          },
          {
            type: "object",
            label: "Features Section",
            name: "featuresSection",
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Subtitle",
                name: "subtitle",
              },
            ],
          },
          {
            type: "object",
            label: "Features",
            name: "features",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
              },
            ],
          },
          {
            type: "object",
            label: "CTA Section",
            name: "cta",
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Subtitle",
                name: "subtitle",
              },
            ],
          },
        ],
      },
      {
        name: "philosophy",
        label: "Philosophy Page",
        path: "content/philosophy",
        format: "json",
        ui: {
          router: ({ document }) => {
            return `/philosophy?lang=${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
          },
          {
            type: "string",
            label: "Subtitle",
            name: "subtitle",
          },
          {
            type: "object",
            label: "Mission",
            name: "mission",
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Text",
                name: "text",
              },
            ],
          },
          {
            type: "object",
            label: "Vision",
            name: "vision",
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Text",
                name: "text",
              },
            ],
          },
          {
            type: "object",
            label: "Purpose",
            name: "purpose",
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Text",
                name: "text",
              },
            ],
          },
          {
            type: "string",
            label: "Core Values Title",
            name: "coreValuesTitle",
          },
          {
            type: "object",
            label: "Core Values",
            name: "coreValues",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
              },
            ],
          },
        ],
      },
      {
        name: "projects",
        label: "Projects Page",
        path: "content/projects",
        format: "json",
        ui: {
          router: ({ document }) => {
            return `/projects?lang=${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
          },
          {
            type: "string",
            label: "Subtitle",
            name: "subtitle",
          },
          {
            type: "string",
            label: "Projects Title",
            name: "projectsTitle",
          },
          {
            type: "object",
            label: "Projects",
            name: "projects",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
              },
              {
                type: "string",
                label: "Status",
                name: "status",
                options: ["ongoing", "completed", "upcoming"],
              },
              {
                type: "string",
                label: "Location",
                name: "location",
              },
              {
                type: "number",
                label: "Participants",
                name: "participants",
              },
              {
                type: "string",
                label: "Start Date",
                name: "startDate",
              },
              {
                type: "string",
                label: "Category",
                name: "category",
              },
            ],
          },
          {
            type: "string",
            label: "Events Title",
            name: "eventsTitle",
          },
          {
            type: "object",
            label: "Upcoming Events",
            name: "upcomingEvents",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Date",
                name: "date",
              },
              {
                type: "string",
                label: "Time",
                name: "time",
              },
              {
                type: "string",
                label: "Location",
                name: "location",
              },
              {
                type: "string",
                label: "Type",
                name: "type",
              },
              {
                type: "number",
                label: "Spots",
                name: "spots",
              },
            ],
          },
        ],
      },
      {
        name: "resources",
        label: "Resources Page",
        path: "content/resources",
        format: "json",
        ui: {
          router: ({ document }) => {
            return `/resources?lang=${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
          },
          {
            type: "string",
            label: "Subtitle",
            name: "subtitle",
          },
          {
            type: "string",
            label: "Featured Resources Title",
            name: "featuredResourcesTitle",
          },
          {
            type: "string",
            label: "All Resources Title",
            name: "allResourcesTitle",
          },
          {
            type: "string",
            label: "Techniques Title",
            name: "techniquesTitle",
          },
          {
            type: "object",
            label: "Resources",
            name: "resources",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
              },
              {
                type: "string",
                label: "Type",
                name: "type",
              },
              {
                type: "string",
                label: "Category",
                name: "category",
              },
              {
                type: "string",
                label: "Size",
                name: "size",
              },
              {
                type: "string",
                label: "Duration",
                name: "duration",
              },
              {
                type: "number",
                label: "Downloads",
                name: "downloads",
              },
              {
                type: "number",
                label: "Views",
                name: "views",
              },
              {
                type: "boolean",
                label: "Featured",
                name: "featured",
              },
            ],
          },
          {
            type: "object",
            label: "Techniques",
            name: "techniques",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Items",
                name: "items",
                list: true,
              },
            ],
          },
        ],
      },
      {
        name: "get_involved",
        label: "Get Involved Page",
        path: "content/get-involved",
        format: "json",
        ui: {
          router: ({ document }) => {
            return `/get-involved?lang=${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
          },
          {
            type: "string",
            label: "Subtitle",
            name: "subtitle",
          },
          {
            type: "string",
            label: "Volunteer Opportunities Title",
            name: "volunteerOpportunitiesTitle",
          },
          {
            type: "object",
            label: "Opportunities",
            name: "opportunities",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
              },
              {
                type: "string",
                label: "Commitment",
                name: "commitment",
              },
              {
                type: "string",
                label: "Type",
                name: "type",
              },
              {
                type: "string",
                label: "Benefits",
                name: "benefits",
                list: true,
              },
            ],
          },
          {
            type: "string",
            label: "Courses Title",
            name: "coursesTitle",
          },
          {
            type: "object",
            label: "Courses",
            name: "courses",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Duration",
                name: "duration",
              },
              {
                type: "string",
                label: "Format",
                name: "format",
              },
              {
                type: "string",
                label: "Level",
                name: "level",
              },
              {
                type: "string",
                label: "Next Session",
                name: "nextSession",
              },
              {
                type: "string",
                label: "Price",
                name: "price",
              },
              {
                type: "string",
                label: "Highlights",
                name: "highlights",
                list: true,
              },
            ],
          },
          {
            type: "string",
            label: "How to Get Started Title",
            name: "howToGetStartedTitle",
          },
          {
            type: "object",
            label: "Steps",
            name: "steps",
            list: true,
            fields: [
              {
                type: "string",
                label: "Number",
                name: "number",
              },
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
              },
            ],
          },
          {
            type: "string",
            label: "Contact Form Title",
            name: "contactFormTitle",
          },
          {
            type: "string",
            label: "Contact Form Description",
            name: "contactFormDescription",
          },
        ],
      },
      {
        name: "products",
        label: "Products Page",
        path: "content/products",
        format: "json",
        ui: {
          router: ({ document }) => {
            return `/products?lang=${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
          },
          {
            type: "string",
            label: "Subtitle",
            name: "subtitle",
          },
          {
            type: "string",
            label: "Featured Products Title",
            name: "featuredProductsTitle",
          },
          {
            type: "string",
            label: "All Products Title",
            name: "allProductsTitle",
          },
          {
            type: "string",
            label: "Services Title",
            name: "servicesTitle",
          },
          {
            type: "object",
            label: "Products",
            name: "products",
            list: true,
            fields: [
              {
                type: "string",
                label: "Name",
                name: "name",
              },
              {
                type: "number",
                label: "Price",
                name: "price",
              },
              {
                type: "number",
                label: "Original Price",
                name: "originalPrice",
              },
              {
                type: "image",
                label: "Image",
                name: "image",
              },
              {
                type: "string",
                label: "Category",
                name: "category",
              },
              {
                type: "number",
                label: "Rating",
                name: "rating",
              },
              {
                type: "number",
                label: "Reviews",
                name: "reviews",
              },
              {
                type: "boolean",
                label: "In Stock",
                name: "inStock",
              },
              {
                type: "boolean",
                label: "Featured",
                name: "featured",
              },
              {
                type: "boolean",
                label: "Organic",
                name: "organic",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
              },
              {
                type: "string",
                label: "Features",
                name: "features",
                list: true,
              },
            ],
          },
          {
            type: "object",
            label: "Services",
            name: "services",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Price",
                name: "price",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
              },
              {
                type: "string",
                label: "Features",
                name: "features",
                list: true,
              },
            ],
          },
        ],
      },
      {
        name: "blog",
        label: "Blog Page",
        path: "content/blog",
        format: "json",
        ui: {
          router: ({ document }) => {
            return `/blog?lang=${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
          },
          {
            type: "string",
            label: "Subtitle",
            name: "subtitle",
          },
          {
            type: "object",
            label: "Blog Posts",
            name: "blogPosts",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Excerpt",
                name: "excerpt",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                label: "Author",
                name: "author",
              },
              {
                type: "string",
                label: "Date",
                name: "date",
              },
              {
                type: "string",
                label: "Category",
                name: "category",
              },
              {
                type: "string",
                label: "Read Time",
                name: "readTime",
              },
              {
                type: "image",
                label: "Image",
                name: "image",
              },
              {
                type: "boolean",
                label: "Featured",
                name: "featured",
              },
            ],
          },
        ],
      },
    ],
  },
});