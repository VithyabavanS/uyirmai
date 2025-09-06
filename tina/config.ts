/// <reference types="node" />
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
    router: ({ document }) => `/?lang=${document._sys.filename}`,
  },
  fields: [
    // Hero Section
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

    // Features Section
    {
      type: "object",
      label: "Features Section",
      name: "featuresSection",
      fields: [
        { type: "string", label: "Title", name: "title" },
        { type: "string", label: "Subtitle", name: "subtitle" },
      ],
    },

    // Features List
    {
      type: "object",
      label: "Features",
      name: "features",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.title || "New Feature" }),
        defaultItem: () => ({
          title: "New Feature",
          description: "Feature description...",
        }),
      },
      fields: [
        { type: "string", label: "Title", name: "title" },
        { type: "string", label: "Description", name: "description" },
      ],
    },

    // CTA Section
    {
      type: "object",
      label: "CTA Section",
      name: "cta",
      fields: [
        { type: "string", label: "Title", name: "title" },
        { type: "string", label: "Subtitle", name: "subtitle" },
      ],
    },
  ],
}
,
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
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Core Value" }),
              defaultItem: {
                title: "New Core Value",
                description: "Value description...",
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
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Project" }),
              defaultItem: {
                title: "New Project",
                description: "Project description...",
                status: "ongoing",
                location: "TBD",
                participants: 0,
                startDate: "TBD",
                category: "General",
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
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Event" }),
              defaultItem: {
                title: "New Event",
                date: "TBD",
                time: "TBD",
                location: "TBD",
                type: "General",
                spots: 0,
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
          router: ({ document }) => `/resources?lang=${document._sys.filename}`,
        },
        fields: [
          { type: "string", label: "Title", name: "title" },
          { type: "string", label: "Subtitle", name: "subtitle" },
          { type: "string", label: "Featured Resources Title", name: "featuredResourcesTitle" },
          { type: "string", label: "All Resources Title", name: "allResourcesTitle" },
          { type: "string", label: "Techniques Title", name: "techniquesTitle" },

          // Resources list
          {
            type: "object",
            label: "Resources",
            name: "resources",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Resource" }),
              defaultItem: {
                title: "New Resource",
                description: "Resource description...",
                type: "Document",
                category: "General",
                size: "N/A",
                duration: "N/A",
                downloads: 0,
                views: 0,
                featured: false,
              },
            },
            fields: [
              { type: "string", label: "Title", name: "title" },
              { type: "string", label: "Description", name: "description", ui: { component: "textarea" } },
              { type: "string", label: "Type", name: "type", options: ["Document", "Video", "PDF"] },
              { type: "string", label: "Category", name: "category" },
              { type: "string", label: "Size", name: "size" },
              { type: "string", label: "Duration", name: "duration" },
              { type: "number", label: "Downloads", name: "downloads" },
              { type: "number", label: "Views", name: "views" },
              { type: "boolean", label: "Featured", name: "featured" },

              // ✅ Direct PDF upload (changed from string to image type)
              { 
                type: "image", 
                label: "PDF File", 
                name: "pdfFile"
              },

              // ✅ Video upload
              { type: "image", label: "Video File", name: "videoFile" },
            ],
          },

          // Techniques list
          {
            type: "object",
            label: "Techniques",
            name: "techniques",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Technique" }),
              defaultItem: { title: "New Technique", items: ["Item 1", "Item 2"] },
            },
            fields: [
              { type: "string", label: "Title", name: "title" },
              { type: "string", label: "Items", name: "items", list: true },
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
            label: "Volunteer Opportunities",
            name: "volunteerOpportunities",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Opportunity" }),
              defaultItem: {
                title: "New Opportunity",
                description: "Description of the opportunity",
                commitment: "Flexible",
                type: "Ongoing",
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
                label: "Benefits (comma separated)",
                name: "benefitsText",
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
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Course" }),
              defaultItem: () => ({
                title: "New Course",
                duration: "4 weeks",
                format: "Online",
                level: "Beginner",
                nextSession: "TBD",
                price: "Free",
                highlights: ["Interactive sessions"],
              }),
            },
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
            ui: {
              itemProps: (item) => ({ label: `Step ${item?.number || "?"}: ${item?.title || "New Step"}` }),
              defaultItem: {
                number: "1",
                title: "New Step",
                description: "Step description...",
              },
            },
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
      ui: {
        itemProps: (item) => ({ label: item?.name || "New Product" }),
        defaultItem: {
          name: "New Product",
          price: 0,
          originalPrice: 0,
          image: "",
          category: "General",
          rating: 5,
          reviews: 0,
          inStock: true,
          featured: false,
          organic: false,
          description: "Product description...",
          features: ["Feature 1"],
        },
      },
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
          ui: {
            component: "list",
          },
        },
      ],
    },
    {
      type: "object",
      label: "Services",
      name: "services",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "New Service" }),
        defaultItem: {
          title: "New Service",
          price: "Contact for pricing",
          description: "Service description...",
          features: ["Feature 1"],
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
          ui: {
            component: "list",
          },
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
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Blog Post" }),
              defaultItem: {
                title: "New Blog Post",
                excerpt: "Enter blog post excerpt...",
                author: "Author Name",
                date: new Date().toLocaleDateString(),
                category: "General",
                readTime: "5 min read",
                featured: false,
                fullContent: "",
                videoUrl: ""
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
              {
                type: "rich-text",
                label: "Full Content",
                name: "fullContent",
                description: "Complete article content (will be displayed on individual post pages)",
              },
              {
                type: "string",
                label: "Video URL",
                name: "videoUrl",
                description: "YouTube, Vimeo, or direct video URL (optional)",
              },
            ],
          },
        ],
      },
    ],
  },
});