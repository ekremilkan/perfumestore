import { createApi } from 'unsplash-js';
import { env as processEnv } from 'node:process';

const accessKey = processEnv.UNSPLASH_ACCESS_KEY;

const unsplashClient = accessKey
  ? createApi({ accessKey })
  : null;

export async function getUnsplashImage(query: string) {
  if (!unsplashClient) {
    return null;
  }

  try {
    const response = await unsplashClient.search.getPhotos({
      query,
      perPage: 1,
      orientation: 'landscape'
    });

    if (response.response?.results?.length) {
      const image = response.response.results[0];
      return {
        url: image.urls?.regular ?? null,
        alt: image.alt_description ?? image.description ?? query
      };
    }
  } catch (error) {
    console.error('[unsplash] Failed to fetch image', error);
  }

  return null;
}
