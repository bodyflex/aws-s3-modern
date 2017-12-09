'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var S3 = function () {
  function S3(bucket, region) {
    _classCallCheck(this, S3);

    this._s3 = new _awsSdk2.default.S3({ signatureVersion: 'v4', region: region });
    this._bucket = bucket;
    this._region = region;
  }

  _createClass(S3, [{
    key: '_getBaseUrl',
    value: function _getBaseUrl(filename) {
      return 'https://s3.' + this._region + '.amazonaws.com/' + this._bucket + '/' + filename;
    }
  }, {
    key: 'upload',
    value: function upload(buffer, filename, ContentType) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._s3.upload({
          Bucket: _this._bucket,
          Key: filename,
          Body: buffer,
          ContentType: ContentType,
          ACL: 'public-read'
        }, function (err, data) {
          return err ? reject(err) : resolve(data.Location);
        });
      });
    }
  }, {
    key: 'getUrl',
    value: function getUrl(filename) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2._s3.headObject({ Bucket: _this2._bucket, Key: filename }, function (err) {
          return err ? resolve(null) : resolve(_this2._getBaseUrl(filename));
        });
      });
    }
  }, {
    key: 'upsert',
    value: async function upsert(buffer, filename, ContentType) {
      var url = await this.getUrl(filename);
      if (url) {
        return url;
      }
      return this.upload(buffer, filename, ContentType);
    }
  }]);

  return S3;
}();

exports.default = S3;
;
