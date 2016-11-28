'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bucket = process.env.AWS_BUCKET;
var region = process.env.AWS_REGION;

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
      return 'https://s3.' + this._region + '.amazonaws.com/' + this._Bucket + '/' + this._filename;
    }
  }, {
    key: 'upload',
    value: function upload(buffer, filename, ContentType) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._s3.upload({
          Bucket: Bucket,
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
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(buffer, filename, ContentType) {
        var url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getUrl(filename);

              case 2:
                url = _context.sent;

                if (!url) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', url);

              case 5:
                return _context.abrupt('return', this.upload(buffer, filename, ContentType));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function upsert(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return upsert;
    }()
  }]);

  return S3;
}();

exports.default = S3;
;
