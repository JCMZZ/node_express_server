let CaptchaPng = require("captchapng");
let WebUtil = require('./webutil');
/**
  * 图片验证码
  * @param {Object} req 
  */
module.exports = function (req, res) {
  let code = '123456789';
  let length = 4;
  let randomcode = '';
  for (let i = 0; i < length; i++) {
    randomcode += code[parseInt(Math.random() * 1000) % code.length];
  }
  /**
   * 保存到session 
   */
  WebUtil.sessionEMSD(req, 'set', 'captcha', randomcode);
  /**
   * 输出图片 
   */
  let p = new CaptchaPng(195, 50, parseInt(randomcode)); // width,height,numeric captcha
  /* First color: background (red, green, blue, alpha) */
  // p.color(0, 0, 0, 0);
  /* Second color: paint (red, green, blue, alpha) */
  p.color(80, 80, 80, 255);
  let img = p.getBase64();
  return new Buffer(img, 'base64');
}