import { env } from '@/constants';
import { client } from '@/plugins/axios/axios';

export async function search(keyword) {
    return await client.get(`${env.BASE_URL}/search/${keyword}`);
}
