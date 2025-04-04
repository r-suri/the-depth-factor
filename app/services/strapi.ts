import axios from 'axios';
import { StrapiResponse, Blog, Subniche } from '../types/strapi';

const API_URL = 'https://cms.thedepthfactor.com/api';
const API_TOKEN = 'c926b56ebc582a55d468c758d05e59dac01e830a8831e02fe698762d3c36aa31a06e382f44845e421d018a51dfb4aeab5a50728292c6ea6f700e3f2d1a2b860b23b2538c1e4295b86822e935c3350d72d7ee1956a09c0f2a1f0f245187802e5e51fdc2e98f3eff72bd909d4ed5c2840bde2bf501250c18fa3b64bdfe051c8268';

const strapiAxios = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export async function fetchBlogs(params = {}) {
  try {
    const response = await strapiAxios.get<StrapiResponse<Blog>>('/blogs', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}

export async function fetchSubniches(params = {}) {
  try {
    const response = await strapiAxios.get<StrapiResponse<Subniche>>('/subniches', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching subniches:', error);
    throw error;
  }
} 