import path from 'path';

const config = {
    server: '',
    port: 5050,
    dirname: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    get UPLOAD_DIR() { return `${this.dirname}/public/images`},
    // mongoDB_URI: '',
    mongoDB_URI: '',
    mongoDB_ID_regex: /^[a-fA-F0-9]{24}$/
}

export default config;