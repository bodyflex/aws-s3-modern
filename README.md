# AWS S3 Modern
A thin wrapper on top of the official AWS S3 JavaScript SDK providing a simpler interface for uploading files to and getting filenames from a certain bucket on S3.

**Only designed to be used on Node.js, not in the browser.**

## Configuration and initialization
AWS access key ID and secret should be defined in the environment as: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

The library exports a class that should be initialized with at least the bucket name and optionally the region.
```js
import S3 from 'aws-s3-modern';

const s3 = new S3('bucket_name', 'eu-central-1');
```

## Usage
The exported class has three public functions.

### `s3.upload(buffer, filename, contentType)`
Returns a `Promise` that resolves with the URL to the uploaded resource as a string, or rejects in case of an error.

### `s3.getUrl(filename)`
Returns a `Promise` that **always** resolves with either `null` (in case there is no such file) or with the URL to the uploaded resource as a string.

### `s3.upsert(buffer, filename, contentType)`
Attempt to fetch the URL for the file with `filename`, and in case it's not found, uploads the file and returns the URL to it. Returns a `Promise` that resolves with the URL to the uploaded resource as a string, or rejects in case of an error.
