import { Client } from '@elastic/elasticsearch';

// export default new Client({ node: 'http://host.docker.internal:9200' });
export default new Client({ node: 'http://172.17.0.1:9200' })
