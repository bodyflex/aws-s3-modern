import AWS from 'aws-sdk';

export default class S3 {
  constructor(bucket, region) {
    this._s3 = new AWS.S3({signatureVersion: 'v4', region});
    this._bucket = bucket;
    this._region = region;
  }
  _getBaseUrl(filename) {
    return 'https://s3.' + this._region + '.amazonaws.com/' + this._bucket + '/' + filename;
  }
  upload(buffer, filename, ContentType) {
    return new Promise((resolve, reject) => {
      this._s3.upload(
        {
          Bucket: this._bucket,
          Key: filename,
          Body: buffer,
          ContentType,
          ACL: 'public-read'
        },
        (err, data) => err ? reject(err) : resolve(data.Location)
      );
    });
  }
  getUrl(filename) {
    return new Promise(resolve => {
      this._s3.headObject(
        {Bucket: this._bucket, Key: filename},
        err => err ? resolve(null) : resolve(this._getBaseUrl(filename))
      );
    });
  }
  async upsert(buffer, filename, ContentType) {
    const url = await this.getUrl(filename);
    if (url) {
      return url;
    }
    return this.upload(buffer, filename, ContentType);
  };
};
