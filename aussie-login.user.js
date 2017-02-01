// ==UserScript==
// @name        Aussie Home Loans Login
// @namespace   https://lachy.id.au/
// @description Overrides Aussie's stupid password login form
// @author      Lachlan Hunt https://github.com/lachlanhunt
// @updateURL   https://github.com/lachlanhunt/aussie-homeloans-login-userscript/raw/master/aussie-login.user.js
// @include     https://online.aussie.com.au/AHL*
// @version     1.0.0
// @grant       none
// ==/UserScript==

(function() {
  window.addEventListener("load", setup, false);

  var numPad;

  function setup() {
    if (!document.querySelector(".entrypage")) return;

    numPad = [
      document.querySelector("#numericScramblePad .scbtn_[value='0']"),
      document.querySelector("#numericScramblePad .scbtn_[value='1']"),
      document.querySelector("#numericScramblePad .scbtn_[value='2']"),
      document.querySelector("#numericScramblePad .scbtn_[value='3']"),
      document.querySelector("#numericScramblePad .scbtn_[value='4']"),
      document.querySelector("#numericScramblePad .scbtn_[value='5']"),
      document.querySelector("#numericScramblePad .scbtn_[value='6']"),
      document.querySelector("#numericScramblePad .scbtn_[value='7']"),
      document.querySelector("#numericScramblePad .scbtn_[value='8']"),
      document.querySelector("#numericScramblePad .scbtn_[value='9']")
    ];

    document.querySelector("#txtPassword").readOnly = false;
    var submitButton = document.querySelector("input[value='Sign In']");
    submitButton.onclick = null;
    submitButton.addEventListener("click", modifyPassword, true);

    document.querySelector("#LG01 .entryarea fieldset").style.display = "none";
    document.querySelector("#txtPassword").style.marginLeft = 0;
    document.querySelector(".passworddesc").style.display = "none";
    
  }

  function modifyPassword(evt) {
    var txtPassword = document.querySelector("#txtPassword");
    var realPassword = txtPassword.value;
    
    txtPassword.value = "";
    Array.from(realPassword).forEach(digit => enterNum(numPad[digit]));

    return subWith(evt.target.name, evt);
  }
})();
