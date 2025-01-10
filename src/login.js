importPackage(org.jsoup);
const BASE_URL = "https://api.wow.wrtn.ai/auth";
const UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";


let randomAndroidSubDeviceUUID = function () {
  return Array(16).fill('').map(c => (Math.random() * 16 | 0).toString(16)).join('');
};

function WRTN() {
  this.email = null;
  this.password = null;
  this.platform = "web";
  this.deviceId = null;
  this.accessToken = null;
  this.accessTokenExpiredAt = null;
}
WRTN.prototype.init = function (email, password) {
  if(!email) {
    throw new TypeError("email is required");
    return;
  }
  if(!password) {
    throw new TypeError("password is required");
    return;
  }
  this.email = email;
  this.password = password;
  this.deviceId = randomAndroidSubDeviceUUID();
};

WRTN.prototype.getData = function() {
  return {
    email: this.email,
    password: this.password,
    deviceId: this.deviceId,
    accessToken: this.accessToken,
    accessTokenExpiredAt: this.accessTokenExpiredAt
  };
};
WRTN.prototype.email_exist = function (email) {
  if(!email) {
    throw new TypeError("email is required");
    return;
  }
  return JSON.parse(Jsoup.connect(BASE_URL + "/check?email=" + email)
    .header("Content-Type", "application/json")
    .header("User-Agent", UserAgent)
    .ignoreHttpErrors(!0)
    .ignoreContentType(!0)
    .method(Connection.Method.GET)
    .execute()
    .body());
};

WRTN.prototype.sendEmail = function() {
  return JSON.parse(Jsoup.connect(BASE_URL + "/code?email=" + this.email)
    .header("Content-Type", "application/json")
    .header("User-Agent", UserAgent)
    .ignoreHttpErrors(!0)
    .ignoreContentType(!0)
    .method(Connection.Method.POST)
    .execute()
    .body());
};

WRTN.prototype.verifyEmail = function(code) {
  if(!code) {
    throw new TypeError("code is required");
    return;
  }
  return JSON.parse(Jsoup.connect(BASE_URL + "/code?email=" + this.email + "&code=" + code)
    .header("Content-Type", "application/json")
    .header("User-Agent", UserAgent)
    .ignoreHttpErrors(!0)
    .ignoreContentType(!0)
    .method(Connection.Method.GET)
    .execute()
    .body());
};

WRTN.prototype.register = function() {
  return JSON.parse(Jsoup.connect(BASE_URL + "/register?deviceId=" + this.deviceId + "&platform=" + this.platform)
    .header("Content-Type", "application/json")
    .header("User-Agent", UserAgent)
    .requestBody(JSON.stringify(
      {
        "email": this.email, 
        "password": this.password
      }
    ))
    .ignoreHttpErrors(!0)
    .ignoreContentType(!0)
    .method(Connection.Method.POST)
    .execute()
    .body());
};

WRTN.prototype.login = function() {
  let result = Jsoup.connect(BASE_URL + "/local")
    .header("Refresh", "")
    .header("Content-Type", "application/json")
    .header("User-Agent", UserAgent)
    .requestBody(JSON.stringify(
      {
        "email": this.email,
        "password": this.password
      }
    ))
    .ignoreHttpErrors(!0)
    .ignoreContentType(!0)
    .method(Connection.Method.POST)
    .execute()
    .body();
    
    if(!JSON.parse(result).data) return JSON.parse(result);
    result = JSON.parse(result).data;
    this.accessToken = result.accessToken;
    this.accessTokenExpiredAt = new Date(result.accessTokenExpiredAt).getTime();
    return JSON.parse(JSON.stringify(result, ["accessToken", "accessTokenExpiredAt"]));
};

WRTN.prototype.isLogin = function() {
  if(new Date().getTime() > this.accesTokenExpiredAt || !this.accessTokenExpiredAt)
    return false;
  return true;
};

WRTN.prototype.YoutubeSummary = function (url) {
  if(!url) {
    throw new TypeError("url is required");
    return;
  }
  let result = Jsoup.connect("https://auto-gen.wrtn.ai/summary/generate-summary")
    .requestBody(JSON.stringify({
      "type": "youtube",
      "urlOrText": url
    }))
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    .header("authorization", "Bearer " + this.accessToken)
    .ignoreHttpErrors(!0)
    .ignoreContentType(!0)
    .timeout(0)
    .method(Connection.Method.POST)
    .execute()
    .body();
  return JSON.parse(result);
};

WRTN.prototype.toString = function() {
  return "[object WRTN]";
};
WRTN.toString = function() {
  return "[object WRTN]";
};

WRTN.prototype.init.prototype.toString = function() {
  return "function init() { [native code for WRTN.init, arity=2] }";
};
WRTN.prototype.init.toString = function() {
  return "function init() { [native code for WRTN.init, arity=2] }";
};
WRTN.prototype.getData.prototype.toString = function() {
  return "function getData() { [native code for WRTN.getData, arity=0] }";
};
WRTN.prototype.getData.toString = function() {
  return "function getData() { [native code for WRTN.getData, arity=0] }";
};
WRTN.prototype.email_exist.prototype.toString = function() {
  return "function email_exist() { [native code for WRTN.email_exist, arity=1] }";
};
WRTN.prototype.email_exist.toString = function() {
  return "function email_exist() { [native code for WRTN.email_exist, arity=1] }";
};
WRTN.prototype.sendEmail.prototype.toString = function() {
  return "function sendEmail() { [native code for WRTN.sendEmail, arity=0] }";
};
WRTN.prototype.sendEmail.toString = function() {
  return "function sendEmail() { [native code for WRTN.sendEmail, arity=0] }";
};
WRTN.prototype.verifyEmail.prototype.toString = function() {
  return "function verifyEmail() { [native code for WRTN.verifyEmail, arity=1] }";
};
WRTN.prototype.verifyEmail.toString = function() {
  return "function verifyEmail() { [native code for WRTN.verifyEmail, arity=1] }";
};
WRTN.prototype.register.prototype.toString = function() {
  return "function register() { [native code for WRTN.register, arity=0] }";
};
WRTN.prototype.register.toString = function() {
  return "function register() { [native code for WRTN.register, arity=0] }";
};
WRTN.prototype.login.prototype.toString = function() {
  return "function login() { [native code for WRTN.login, arity=0] }";
};
WRTN.prototype.login.toString = function() {
  return "function login() { [native code for WRTN.login, arity=0] }";
};
WRTN.prototype.isLogin.prototype.toString = function() {
  return "function isLogin() { [native code for WRTN.isLogin, arity=0] }";
};
WRTN.prototype.isLogin.toString = function() {
  return "function isLogin() { [native code for WRTN.isLogin, arity=0] }";
};
WRTN.prototype.YoutubeSummary.prototype.toString = function() {
  return "function YoutubeSummary() { [native code for WRTN.YoutubeSummary, arity=1] }";
};
WRTN.prototype.YoutubeSummary.toString = function() {
  return "function YoutubeSummary() { [native code for WRTN.YoutubeSummary, arity=1] }";
};

exports.WRTN = WRTN;
