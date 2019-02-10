var config = require('./config.json');

var lang = 'es';

var obfuscate_key = "RYliAnk19vSIf0cP2abuWd6zryFm4ohV7GDNeBKQwCtsLXUJqET8OHpZ5Mxg3j";

function obfuscate(string, key) {

  if(key == undefined) {
    key = obfuscate_key;
  }

  answer = "";

  for (i=0; i<string.length; i++) {
    if (key.indexOf(string.charAt(i)) == -1 ) {
      answer += string.charAt(i);
    } else {
      chr = (key.indexOf(string.charAt(i)) + string.length) % key.length;
      answer += key.charAt(chr);
    }
  }

  return answer;
}

function deobfuscate(string, key) {

  answer = '';

  for (i=0; i<string.length; i++) {
    if (key.indexOf(string.charAt(i)) == -1 ) {
      chr = string.charAt(i);
      answer += (chr);
    } else {
      chr = (key.indexOf(string.charAt(i)) - string.length + key.length) % key.length;
      answer += (key.charAt(chr));
    }
  }

  return answer;
}

function deobfuscate_mailto(string, key) {
  return "<a class='mailto' href='mailto:" + deobfuscate(string, key) + "'>" + deobfuscate(string, key) + "</a>";
}

function obf_email(address) {
  return "<script type='text/javascript'>document.write(deobfuscate_mailto('" + obfuscate(address) + "', '" + obfuscate_key + "'));</script>";
}

function obf_email_init() {
  return "<script type='text/javascript'>" + String(deobfuscate) + '; ' + String(deobfuscate_mailto) + "</script>";
}

var localized_strings = require('./strings.js')

function str(id) {
  if(localized_strings[id] != undefined && localized_strings[id][lang] != undefined) {
    return localized_strings[id][lang];
  } else {
    return '<?php print t(\'' + id + '\');?>';
  }
}

function setLang(code) {
  lang = code;
}

function getLang() {
  return lang;
}

function pageTitle(title) {
  if(title === undefined) {
    return config.siteName;
  } else {
    return title + ' - ' + config.siteName;
  }
}

module.exports = {
  obf_email: obf_email,
  obf_email_init: obf_email_init,
  str: str,
  setLang: setLang,
  getLang: getLang,
  pageTitle: pageTitle,
  config: config
};