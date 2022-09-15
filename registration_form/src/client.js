import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "z7v31t5j",
  dataset: "production",
  apiVersion: "2022-02-01",
  useCdn: true,
  token:
    "sk4XzShjvJbgs0rCVRRC4fDfH1sh1NePn2GFoaVR4984U4qeA7a7A2aYzuLTdFFCXSpHbtENFA7IhFXa5nAABnF6oDR01iebvsc9J5N6pkYROP3AFiQg4MXpLciOGeI6q23CEcYrTGzbL40bzusrBC4nKDHqztgwk0jDsjIvCJGjWLB9pQi2",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
