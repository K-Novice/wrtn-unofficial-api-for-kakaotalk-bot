importPackage(Packages.okhttp3);
importPackage(java.util.concurrent);

let client = new OkHttpClient.Builder()
  .connectTimeout(0, TimeUnit.SECONDS)
  .readTimeout(0, TimeUnit.SECONDS)
  .writeTimeout(0, TimeUnit.SECONDS)
  .build();

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0";
const API = {
  isExsist: "https://api.deepai.org/get_user_login_type",
  register: "https://api.deepai.org/daily-time-sync/registration/",
  login: "https://api.deepai.org/daily-time-sync/login/",
  user: "https://api.deepai.org/daily-time-sync/user/",
  addCharacter: "https://api.deepai.org/create_character",
  characterList: "https://api.deepai.org/get_character_row/0/",
  chat: "https://api.deepai.org/hacking_is_a_serious_crime",
  text2img: "https://api.deepai.org/api/",
  style: "https://deepai.org/styles",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
};

let myhashfunction = function() {
  for (var a = [], b = 0; 64 > b; )
    a[b] = 0 | 4294967296 * Math.sin(++b % Math.PI);
  return function(c) {
    var d, e, f, g = [d = 1732584193, e = 4023233417, ~d, ~e], h = [], l = unescape(encodeURI(c)) + "\u0080", k = l.length;
    c = --k / 4 + 2 | 15;
    for (h[--c] = 8 * k; ~k; )
      h[k >> 2] |= l.charCodeAt(k) << 8 * k--;
    for (b = l = 0; b < c; b += 16) {
      for (k = g; 64 > l; k = [f = k[3], d + ((f = k[0] + [d & e | ~d & f, f & d | ~f & e, d ^ e ^ f, e ^ (d | ~f)][k = l >> 4] + a[l] + ~~h[b | [l, 5 * l + 1, 3 * l + 5, 7 * l][k] & 15]) << (k = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * k + l++ % 4]) | f >>> -k), d, e])
        d = k[1] | 0,
      e = k[2];
      for (l = 4; l; )
        g[--l] += k[l];
    }
    for (c = ""; 32 > l; )
      c += (g[l >> 3] >> 4 * (1 ^ l++) & 15).toString(16);
    return c.split("").reverse().join("");
  };
}();


function DeepAI() {
  
  this.email = null;
  this.password = null;
  this.csrftoken = null;
  this.sessionid = null;
  
  this.tryitApiKey = function() {
    let request = new Request.Builder()
      .url("https://deepai.org/chat")
      .get()
      .build()

    let body = client.newCall(request)
      .execute()
      .body()
      .string();

    let code = body
      .split("const tryitApiKey='tryit")[1]
      .split(")))")[0]
      .split("t+myrandomstr+'")[1]
      .slice(0, -1);

    return code;
  }();

  this.isExist = function(email) {
    let body = new MultipartBody.Builder()
      .setType(MultipartBody.FORM)
      .addFormDataPart("email", email)
      .build();

    let request = new Request.Builder()
      .url("https://api.deepai.org/get_user_login_type")
      .post(body)
      .addHeader("User-Agent", USER_AGENT) 
      .build();
    
    let data = client.newCall(request)
      .execute()
      .body()
      .string();
      
    return data;
  };
  
  this.init = function(email, password) {
    this.email = email;
    this.password= password;
  };
  
  this.register = function() {
    let body = new MultipartBody.Builder()
      .setType(MultipartBody.FORM)
      .addFormDataPart("email", this.email)
      .addFormDataPart("username", this.email)
      .addFormDataPart("password1", this.password)
      .addFormDataPart("password2", this.password)
      .build()
      
    let request = new Request.Builder()
      .url(API.register)
      .post(body)
      .addHeader("User-Agent", API.userAgent)
      .build()
      
    let data = client.newCall(request)
      .execute()
      .body()
      .string()
      
    return data;
  };
  
  this.login = function() {
    let body = new MultipartBody.Builder()
      .setType(MultipartBody.FORM)
      .addFormDataPart("email", this.email)
      .addFormDataPart("password", this.password)
      .build()
      
    let request = new Request.Builder()
      .url(API.login)
      .post(body)
      .addHeader("User-Agent", API.userAgent)
      .build()
      
    let data = client.newCall(request)
      .execute()
      
    data = data.headers("Set-Cookie")
      .toArray()
      .map(v => v.split(/=|;/g)[1]);
      
    this.csrftoken = data[0];
    this.sessionid = data[1];
        
    return this.isLogin();
  };
  
  this.isLogin = function() {
    let request = new Request.Builder()
      .url(API.user)
      .get()
      .addHeader("User-Agent", API.userAgent)
      .addHeader("Cookie", "csrftoken=" + this.csrftoken + "; sessionid=" + this.sessionid)
      .build();

    let data = client.newCall(request)
      .execute()
      .body()
      .string();
    
    return data;
  };
  
  
  this.info = {
    image_generator_version : ["hd", "standard", "genius"],
    preference : ["speed", "quality"],
    genius_preference : ["anime", "photography", "graphic", "cinematic"],
    role: ["user", "system", "assistant"]
  };
  

  this.text2img = function(style, prompt, image_generator_version, use_old_model, preference, genius_preference, negative_prompt, width, height) {
    let myrandomstr = Math.round((Math.random() * 100000000000)) + "";
    let tryitApiKey = 'tryit-' + myrandomstr + '-' + myhashfunction(API.userAgent + myhashfunction(API.userAgent + myhashfunction(API.userAgent + myrandomstr + this.tryitApiKey)));
    
    let body = new MultipartBody.Builder()
      .setType(MultipartBody.FORM)
      .addFormDataPart("text", prompt)
      .addFormDataPart("image_generator_version", image_generator_version)
      .addFormDataPart("use_old_model", use_old_model)
      .addFormDataPart(preference, true) //preference: speed or quality
      .addFormDataPart("genius_preference", genius_preference)
      .addFormDataPart("negative_prompt", negative_prompt)
      .addFormDataPart("width", width.toString() || "512") // String, default = 512, 128 ~ 1536
      .addFormDataPart("height", height.toString() || "512") // String, default = 512, 128 ~ 1536
      .build()
      
    let request = new Request.Builder()
      .url(API.text2img + style)
      .post(body)
      .addHeader("api-key", tryitApiKey)
      .addHeader("User-Agent", API.userAgent)
      .build()
    
    let data = client.newCall(request)
      .execute()
      .body()
      .string()
      
    return data;
  };
  
  this.addCharacter = function(name, description, isPublic) {
    let body = new MultipartBody.Builder()
      .setType(MultipartBody.FORM)
      .addFormDataPart("char_info", JSON.stringify({
        name: name,
        description: description,
        isPublic: isPublic
      }))
      .build()

    let request = new Request.Builder()
      .url(API.addCharacter)
      .post(body)
      .addHeader("Cookie", "csrftoken=" + this.csrftoken + "; sessionId=" + this.sessionId)
      .addHeader("User-Agent", API.userAgent)
      .build()

    return client.newCall(request)
      .execute()
      .body()
      .string();
  };
  
  this.characterList = function(keyword) {
    let request = new Request.Builder()
      .url(API.characterList + (keyword || "null")+ "/All")
      .get()
      .addHeader("Cookie", "csrftoken=" + this.csrftoken + "; sessionId=" + this.sessionId)
      .addHeader("User-Agent", API.userAgent)
      .build();

    return client.newCall(request)
      .execute()
      .body()
      .string();
  };
  
  this.chat = function(chat_style, chatHistory) {
    let myrandomstr = Math.round((Math.random() * 100000000000)) + "";
    let tryitApiKey = 'tryit-' + myrandomstr + '-' + myhashfunction(API.userAgent + myhashfunction(API.userAgent + myhashfunction(API.userAgent + myrandomstr + this.tryitApiKey)));

    let body = new MultipartBody.Builder()
      .setType(MultipartBody.FORM)
      .addFormDataPart("chat_style", chat_style)
      .addFormDataPart("chatHistory", JSON.stringify(chatHistory))
      .build()
      
    let request = new Request.Builder()
      .url(API.chat)
      .post(body)
      .addHeader("Api-Key", tryitApiKey)
      .addHeader("User-Agent", API.userAgent)
      .build();
      
    let response = client.newCall(request)
      .execute();
    if(response.code() >= 200 && response.code() <= 299)
      return {
        role: "assistant",
        content: response
          .body()
          .string()
        };
    return {
      status: response.code(),
      error: response
          .body()
          .string()
    };
  };

  this.styles = function() {
    let request = new Request.Builder()
      .url(API.style)
      .get()
      .build();

    doc = client.newCall(request)
      .execute()
      .body()
      .string();
  
    doc = org.jsoup.Jsoup.parse(doc);

    doc = doc.select("div[class=\"style-generator-model\"]");

    return JSON.stringify(new Array(doc.size()).fill().map((_, i) => {
      let data = doc.get(i).select("img")[0].attr("src");
      return {
        banner: data,
        name: data.split(/\/|\.jpg/g).slice(-2)[0].replace(/\-thumb$|\-thu/g, "")
      };
    }))
  };
  

  this.init.prototype.toString = function() {
    return "function init() { [native code for DeepAI.init, arity=2] }";
  };

  this.init.toString = function() {
    return "function init() { [native code for DeepAI.init, arity=2] }";
  };

  this.register.prototype.toString = function() {
    return "function register() { [native code for DeepAI.register, arity=0] }";
  };

  this.register.toString = function() {
    return "function register() { [native code for DeepAI.register, arity=0] }";
  };

  this.login.prototype.toString = function() {
    return "function login() { [native code for DeepAI.login, arity=0] }";
  };

  this.login.toString = function() {
    return "function login() { [native code for DeepAI.login, arity=0] }";
  };

  this.isLogin.prototype.toString = function() {
    return "function isLogin() { [native code for DeepAI.isLogin, arity=0] }";
  };

  this.isLogin.toString = function() {
    return "function isLogin() { [native code for DeepAI.isLogin, arity=0] }";
  };

  this.isExist.prototype.toString = function() {
    return "function isExist() { [native code for DeepAI.isExist, arity=1] }";
  };

  this.isExist.toString = function() {
    return "function isExist() { [native code for DeepAI.isExist, arity=1] }";
  };

  this.text2img.prototype.toString = function() {
    return "function text2img() { [native code for DeepAI.text2img, arity=9] }";
  };
  this.text2img.toString = function() {
    return "function text2img() { [native code for DeepAI.text2img, arity=9] }";
  };

  this.styles.prototype.toString = function() {
    return "function styles() { [native code for DeepAI.styles, arity=0] }";
  };
  this.styles.toString = function() {
    return "function styles() { [native code for DeepAI.styles, arity=0] }";
  };
  
  this.chat.prototype.toString = function() {
    return "function chat() { [native code for DeepAI.chat, arity=2] }";
  };
  this.chat.toString = function() {
    return "function chat() { [native code for DeepAI.chat, arity=2] }";
  };
  
  this.addCharacter.prototype.toString = function() {
    return "function addCharacter() { [native code for DeepAI.addCharacter, arity=3] }";
  };
  this.addCharacter.toString = function() {
    return "function addCharacter() { [native code for DeepAI.addCharacter, arity=3] }";
  };
  
  this.characterList.prototype.toString = function() {
    return "function characterList() { [native code for DeepAI.characterList, arity=1] }";
  };
  this.characterList.toString = function() {
    return "function characterList() { [native code for DeepAI.characterList, arity=1] }";
  };

  this.toString = function() {
    return "[object DeepAI]";
  };
}

DeepAI.toString = function() {
  return "[object DeepAI]";
};

exports.DeepAI = DeepAI;